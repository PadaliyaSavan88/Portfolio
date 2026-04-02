---
title: 'Vertex AI Setup for Node.js Apps'
date: '2026-03-22'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Step-by-step guide to integrating Google Vertex AI into your Node.js application — from project setup and authentication to making your first generative AI call.'
keyword: 'Vertex AI, Node.js, Google Cloud, AI integration, generative AI, @google-cloud/vertexai, authentication, production AI'
---


Google Vertex AI gives you access to Gemini and other Google foundation models through a managed, enterprise-grade API — with better SLAs, regional data residency options, and tighter Google Cloud integration than the public Gemini API. If you're building a production SaaS product on GCP, Vertex AI is worth the extra setup effort. This guide walks you through the full process.

## Prerequisites

Before writing a single line of code, make sure you have:

- A **Google Cloud Project** with billing enabled
- The **Vertex AI API** enabled (search "Vertex AI API" in the GCP console and click Enable)
- The **gcloud CLI** installed locally (`brew install google-cloud-sdk` on macOS, or download from cloud.google.com)
- Node.js 18+ installed

Enable the API via CLI if you prefer:

```bash
gcloud services enable aiplatform.googleapis.com --project=YOUR_PROJECT_ID
```

## Installing the SDK

```bash
npm install @google-cloud/vertexai
```

The `@google-cloud/vertexai` package is the official SDK for accessing Gemini models through Vertex AI. It handles authentication, request formatting, and streaming for you.

## Authentication

This is the most common stumbling block. Vertex AI uses Google Cloud's IAM, not simple API keys. You have two options:

### Option 1: Application Default Credentials (ADC) — For Local Development

Run this once in your terminal:

```bash
gcloud auth application-default login
```

This stores credentials at `~/.config/gcloud/application_default_credentials.json`. The SDK picks them up automatically — no code changes needed.

### Option 2: Service Account — For Production / CI/CD

1. Go to IAM & Admin > Service Accounts in the GCP console
2. Create a service account and assign the **Vertex AI User** role
3. Download the JSON key file
4. Set the environment variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

In production (Cloud Run, GKE, etc.), assign the service account directly to the compute resource instead of using key files — this is more secure and avoids key rotation headaches.

## Your First Generative AI Call

```js
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: 'your-gcp-project-id',
  location: 'us-central1', // or europe-west4, asia-northeast1, etc.
});

const model = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
});

async function generateText(prompt) {
  const request = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
      topP: 0.9,
    },
  };

  const result = await model.generateContent(request);
  const response = result.response;
  const text = response.candidates[0].content.parts[0].text;

  return text;
}

const answer = await generateText('Explain how transformer attention works in 3 sentences.');
console.log(answer);
```

The `location` parameter matters for latency and data residency. `us-central1` is the most feature-complete region; if you're serving European users, `europe-west4` keeps data within the EU.

## Streaming Responses

For user-facing applications, streaming dramatically improves perceived responsiveness — users see text appear word by word rather than waiting for the full response.

```js
async function streamText(prompt) {
  const request = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
  };

  const streamingResult = await model.generateContentStream(request);

  process.stdout.write('Response: ');
  for await (const chunk of streamingResult.stream) {
    const chunkText = chunk.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    process.stdout.write(chunkText);
  }

  // Get the final aggregated response for metadata (token counts, etc.)
  const finalResponse = await streamingResult.response;
  console.log('\n\nTotal tokens:', finalResponse.usageMetadata?.totalTokenCount);
}

await streamText('Write a haiku about distributed systems.');
```

In an Express or Fastify API, pipe the stream chunks directly to the HTTP response with `res.write()` and call `res.end()` when the stream finishes.

## Multi-turn Conversations (Chat)

```js
const chat = model.startChat({
  history: [],
  generationConfig: { maxOutputTokens: 512 },
});

async function chat_turn(userMessage) {
  const result = await chat.sendMessage(userMessage);
  return result.response.candidates[0].content.parts[0].text;
}

console.log(await chat_turn('What is LangChain?'));
console.log(await chat_turn('How does it compare to LlamaIndex?'));
// The second turn has full context of the first
```

## Handling Errors and Quotas

Vertex AI enforces quotas per region per minute. Common errors you'll encounter:

```js
async function safeGenerate(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      return result.response.candidates[0].content.parts[0].text;
    } catch (error) {
      if (error.code === 429) {
        // RESOURCE_EXHAUSTED — quota exceeded
        const waitMs = Math.pow(2, attempt) * 1000; // exponential backoff
        console.warn(`Rate limited. Retrying in ${waitMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
      } else if (error.code === 400) {
        // Bad request — usually a safety filter block
        console.error('Content blocked by safety filters:', error.message);
        throw error; // don't retry
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries exceeded');
}
```

To increase quotas, go to IAM & Admin > Quotas in the GCP console and request an increase for "Generate content requests per minute per region per base model."

## Vertex AI vs Direct Gemini API

| Feature | Vertex AI | Gemini API (AI Studio) |
|---|---|---|
| Authentication | IAM / Service Accounts | API Key |
| SLA | Yes (enterprise) | No |
| VPC / Private networking | Yes | No |
| Regional data residency | Yes | Limited |
| Fine-tuning | Yes | Limited |
| Model Garden access | Yes | No |
| Pricing | Per token (same models) | Per token |
| Setup complexity | Higher | Low |

For a hobby project or prototype, the direct Gemini API is faster to set up. For anything you're putting in front of real users or handling sensitive data, Vertex AI's enterprise controls make the extra setup worthwhile.
