---
title: 'How to Monitor AI Pipelines in Production'
date: '2026-04-01'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Learn how to monitor LLM-powered applications in production — tracking latency, token usage, error rates, and hallucinations using practical tools and strategies.'
keyword: 'AI monitoring, LLM observability, production AI, LangSmith, token tracking, AI pipelines, Node.js, OpenAI monitoring, Gemini monitoring'
---


Shipping an AI feature is only half the battle. Once it's live, you'll quickly realize that **LLM-powered pipelines fail in ways that traditional monitoring doesn't catch**. A request can return HTTP 200, look perfectly fine in your logs, and still produce a hallucinated answer that erodes user trust. This guide covers what to monitor, how to instrument it, and which tools actually help in production.

## Why AI Monitoring Is Different

In a traditional API, a 200 response means success. In an LLM pipeline, a 200 response means the model returned *something* — not necessarily something correct, useful, or safe.

The failure modes unique to AI pipelines include:

- **Hallucinations** — the model confidently states something false
- **Prompt injection** — user input manipulates the system prompt
- **Context window overflow** — inputs grow too large and get silently truncated
- **Latency spikes** — TTFT degrades under load or with longer prompts
- **Cost explosions** — a prompt bug causes unexpectedly large token counts
- **Safety filter blocks** — legitimate requests get refused and users see errors

Your monitoring strategy needs to address all of these, not just uptime and error rate.

## Key Metrics to Track

### Latency
Track two distinct numbers:
- **Time to First Token (TTFT)** — how long before streaming starts. This is what users feel.
- **Total generation time** — important for background jobs and SLA calculations.

A TTFT above 2 seconds will feel sluggish for chat interfaces. Track p50, p90, and p99 — the p99 is where you'll see the real pain.

### Token Usage
Per request, track:
- `prompt_tokens` — input cost
- `completion_tokens` — output cost (usually 3-4x more expensive per token)
- `total_tokens` — for quota monitoring

Aggregate by endpoint, user tier, and feature to understand where costs come from.

### Cost Per Request
Compute this in your logger using the token counts and the model's pricing. Alert when the rolling average cost per request increases by more than 20% — it usually means a prompt bug or an edge case hitting expensive code paths.

### Error Rate
Beyond HTTP errors, track:
- `content_filter_block` — safety system refused the request
- `context_length_exceeded` — input was too long
- `rate_limit_exceeded` — quota hit
- `empty_response` — model returned nothing (rare but happens)

### Output Quality Signals
This is harder to automate but essential:
- User thumbs up/down on AI responses
- Follow-up questions that indicate confusion ("what do you mean?", "can you explain that?")
- Session abandonment after an AI response

## Building a Simple Logger for OpenAI and Gemini

Here's a production-ready logger wrapper for Node.js that captures all the key metrics (works for both [OpenAI and Vertex AI](/blogs/openai-vs-vertex-ai-for-production-saas)):

```js
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function trackedCompletion(params, context = {}) {
  const startTime = Date.now();
  let firstTokenTime = null;
  let fullText = '';

  const logEntry = {
    timestamp: new Date().toISOString(),
    model: params.model,
    feature: context.feature || 'unknown',
    userId: context.userId || null,
    promptTokens: null,
    completionTokens: null,
    ttftMs: null,
    totalMs: null,
    costUsd: null,
    error: null,
    blocked: false,
  };

  try {
    const stream = await openai.chat.completions.create({
      ...params,
      stream: true,
      stream_options: { include_usage: true },
    });

    for await (const chunk of stream) {
      if (firstTokenTime === null && chunk.choices[0]?.delta?.content) {
        firstTokenTime = Date.now();
        logEntry.ttftMs = firstTokenTime - startTime;
      }

      const content = chunk.choices[0]?.delta?.content ?? '';
      fullText += content;

      // Capture final usage stats from the last chunk
      if (chunk.usage) {
        logEntry.promptTokens = chunk.usage.prompt_tokens;
        logEntry.completionTokens = chunk.usage.completion_tokens;
      }
    }

    logEntry.totalMs = Date.now() - startTime;
    logEntry.costUsd = calculateCost(
      params.model,
      logEntry.promptTokens,
      logEntry.completionTokens
    );

    logAIEvent(logEntry);
    return fullText;

  } catch (error) {
    logEntry.error = error.code || error.message;
    logEntry.blocked = error.code === 'content_filter';
    logEntry.totalMs = Date.now() - startTime;
    logAIEvent(logEntry);
    throw error;
  }
}

function calculateCost(model, promptTokens, completionTokens) {
  const pricing = {
    'gpt-4o': { input: 2.50, output: 10.00 },
    'gpt-4o-mini': { input: 0.15, output: 0.60 },
  };
  const rates = pricing[model];
  if (!rates || !promptTokens) return null;
  return (
    (promptTokens / 1_000_000) * rates.input +
    (completionTokens / 1_000_000) * rates.output
  );
}

function logAIEvent(entry) {
  // In production, send to your observability platform
  // e.g., Datadog, Grafana, CloudWatch, or a database
  console.log(JSON.stringify(entry));
}
```

Use it like this:

```js
const response = await trackedCompletion(
  {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: userMessage }],
    max_tokens: 500,
  },
  {
    feature: 'support-chatbot',
    userId: req.user.id,
  }
);
```

Every call now produces a structured log event with full cost and latency data.

## LangSmith for LangChain Observability

If you're using [LangChain.js](/blogs/rag-architecture-for-javascript-developers), **LangSmith** is the dedicated observability tool and it's worth enabling from day one. It captures every step in your chain — retrieval, prompt construction, LLM call, output parsing — with full inputs and outputs.

Setup takes two environment variables:

```bash
export LANGCHAIN_TRACING_V2=true
export LANGCHAIN_API_KEY=ls__...
export LANGCHAIN_PROJECT=my-production-app
```

That's it. LangChain automatically sends traces to LangSmith. In the LangSmith dashboard you can:

- See the full execution trace for any individual request
- Compare prompts across versions with A/B testing
- Set up automated evaluations to catch regressions
- Run "playgrounds" to test prompt changes against historical inputs before deploying

For [RAG pipelines](/blogs/rag-architecture-for-javascript-developers) specifically, LangSmith's trace view shows you exactly which chunks were retrieved and why — invaluable for debugging poor answers.

## Setting Up Alerts

Three alerts every AI-powered service should have:

**Cost spike alert**: If your rolling 1-hour cost exceeds 2x your baseline average, page someone. This catches prompt bugs before they cost thousands of dollars.

**Error rate threshold**: If your LLM error rate (non-200s plus blocked responses) exceeds 5% over a 5-minute window, something is wrong — either the API is degraded or your inputs are hitting safety filters unexpectedly.

**TTFT degradation**: If p90 TTFT exceeds 3 seconds for more than 5 minutes, alert. This usually means you're hitting rate limits or the upstream API is having issues.

## Hallucination Detection Strategies

There's no perfect automated hallucination detector, but you can build layers of defense:

**Source attribution**: In RAG pipelines, always return the source documents alongside the answer. Show users where the information came from. This shifts quality verification partially to the user and helps you identify when retrieval is failing.

**Confidence scoring**: Ask the model to rate its own confidence: `"On a scale of 1-10, how confident are you in this answer based on the provided context?"` Low scores (below 7) can trigger a fallback or human review queue.

**Output validation**: For structured outputs (JSON, specific formats), validate programmatically. A model that returns malformed JSON or missing required fields is a proxy signal for degraded output quality.

**LLM-as-judge**: For asynchronous quality checks, use a separate LLM call to evaluate the response: `"Given this context and question, does this answer contain factual errors or unsupported claims?"` Run this on a sample of production traffic and review the flagged cases weekly.

**PII note**: Before logging LLM inputs and outputs, strip or hash any personally identifiable information. Prompt logs contain everything your users type — treat them with the same care as any sensitive data store.

Monitoring AI pipelines is an ongoing practice, not a one-time setup. The teams that catch quality problems early are the ones that ship AI features users actually trust.
