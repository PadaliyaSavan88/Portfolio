---
title: 'How to Reduce LLM API Costs in Production'
date: '2026-04-27'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Practical strategies to cut OpenAI and Gemini API costs in production — model selection, caching, prompt optimization, batching, and RAG tuning.'
keyword: 'reduce OpenAI costs, LLM cost optimization, Gemini Flash vs GPT-4o mini, AI API budget, LLM caching, prompt token optimization, semantic caching, OpenAI Batch API'
---

Your first month of Vertex AI or OpenAI bills lands and the number is higher than expected. It always is. Here is the systematic approach to cutting it without cutting features.

## Understand Where Your Costs Come From First

Before optimizing, measure. The split is almost never what teams assume.

Run this query against your logs to see your actual cost drivers:

```sql
SELECT
  feature,
  COUNT(*) AS requests,
  SUM(prompt_tokens) AS total_prompt_tokens,
  SUM(completion_tokens) AS total_completion_tokens,
  SUM(cost_usd) AS total_cost,
  AVG(cost_usd) AS avg_cost_per_request
FROM ai_events
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY feature
ORDER BY total_cost DESC;
```

In most production apps, 20% of features drive 80% of token spend. Fix those 20% first.

The [monitoring infrastructure](/blogs/how-to-monitor-ai-pipelines-in-production) you need for this — structured logs with token counts and cost per request — is a prerequisite. If you're not logging that data yet, start there before optimizing.

## Strategy 1: Downgrade to a Cheaper Model Tier

The biggest cost lever is model selection. The quality gap between a frontier model and a fast model is smaller than most teams assume — and the cost difference is large.

From the [OpenAI vs Vertex AI comparison](/blogs/openai-vs-vertex-ai-for-production-saas):

| Model | Input cost per 1M tokens | Relative cost |
|---|---|---|
| GPT-4o | $2.50 | baseline |
| GPT-4o mini | $0.15 | **17x cheaper** |
| Gemini 1.5 Pro | $1.25 | 2x cheaper |
| Gemini 1.5 Flash | $0.075 | **33x cheaper** |

The approach: run your production prompts through both models, evaluate output quality on 50–100 representative inputs, and use the cheaper model everywhere quality is acceptable.

```js
const MODEL_CONFIG = {
  'complex-analysis': { model: 'gpt-4o', temperature: 0 },
  'document-summary': { model: 'gpt-4o-mini', temperature: 0.2 },
  'faq-answer':        { model: 'gpt-4o-mini', temperature: 0 },
  'email-draft':       { model: 'gpt-4o-mini', temperature: 0.4 },
};

function getModel(feature) {
  return MODEL_CONFIG[feature] || { model: 'gpt-4o-mini', temperature: 0 };
}
```

## Strategy 2: Cache Repeated Prompts

If the same (or very similar) prompt is sent multiple times, you're paying for identical computation repeatedly.

### Exact Prompt Caching

```js
import crypto from 'crypto';
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

async function cachedCompletion(messages, options = {}) {
  const cacheKey = crypto
    .createHash('sha256')
    .update(JSON.stringify({ messages, model: options.model }))
    .digest('hex');

  const cached = await redis.get(`llm:${cacheKey}`);
  if (cached) return JSON.parse(cached);

  const response = await openai.chat.completions.create({ messages, ...options });

  await redis.setEx(`llm:${cacheKey}`, 3600, JSON.stringify(response)); // 1-hour TTL
  return response;
}
```

Use exact caching for: FAQ answers, static content generation, any prompt where system prompt + user input does not change.

### Semantic Caching

For queries that ask the same thing in different words, embed the user query and check for a similar cached response:

```js
async function semanticallyCachedCompletion(userQuery, systemPrompt) {
  const queryEmbedding = await embeddings.embedQuery(userQuery);

  const similar = await vectorStore.similaritySearchVectorWithScore(queryEmbedding, 1);

  if (similar.length > 0 && similar[0][1] > 0.97) {
    return similar[0][0].metadata.response; // cache hit
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userQuery },
    ],
  });

  const text = response.choices[0].message.content;

  await vectorStore.addDocuments([{
    pageContent: userQuery,
    metadata: { response: text },
  }]);

  return text;
}
```

Semantic caching can cut 30–60% of API calls for FAQ-style use cases where users rephrase the same underlying question.

## Strategy 3: Optimize Prompt Length

Every token in your prompt costs money on every request. Long system prompts that repeat on every call are a significant, often invisible cost.

```js
import { get_encoding } from 'tiktoken';

const enc = get_encoding('cl100k_base');
const systemPromptTokens = enc.encode(SYSTEM_PROMPT).length;
console.log(`System prompt: ${systemPromptTokens} tokens`);
// At $2.50/1M tokens, 1000-token system prompt at 500K requests/month = $1,250/month
```

Tactics to reduce system prompt token count:
- Remove redundant instructions — if your whole user base is English, drop "always respond in English"
- Compress few-shot examples — 2 tight examples work as well as 5 verbose ones
- Use role framing — "You are an expert X" triggers knowledge without enumerating it
- Remove formatting instructions that don't apply to your use case

## Strategy 4: Set Tight `max_tokens` Per Feature

The default max tokens is very high. A prompt bug that causes verbose output costs much more without a cap.

```js
const FEATURE_TOKEN_LIMITS = {
  'faq-answer':       300,
  'document-summary': 500,
  'code-review':      1000,
  'email-draft':      400,
};

async function boundedCompletion(feature, messages) {
  const { model, temperature } = getModel(feature);
  return openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: FEATURE_TOKEN_LIMITS[feature] || 500,
  });
}
```

## Strategy 5: Batch Requests for Background Jobs

For background processing — document ingestion, content generation, report creation — don't call the API one item at a time. OpenAI's Batch API processes requests at **50% of the standard price** with a 24-hour turnaround:

```js
import fs from 'fs';

const batchRequests = documents.map((doc, i) => ({
  custom_id: `doc-${i}`,
  method: 'POST',
  url: '/v1/chat/completions',
  body: {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Summarize this document in 2 sentences.' },
      { role: 'user', content: doc.content },
    ],
    max_tokens: 100,
  },
}));

fs.writeFileSync('batch_input.jsonl', batchRequests.map(r => JSON.stringify(r)).join('\n'));

const file = await openai.files.create({
  file: fs.createReadStream('batch_input.jsonl'),
  purpose: 'batch',
});

const batch = await openai.batches.create({
  input_file_id: file.id,
  endpoint: '/v1/chat/completions',
  completion_window: '24h',
});

console.log('Batch submitted:', batch.id);
```

For large-scale document processing, this alone halves your cost.

## Strategy 6: Tighten RAG Chunk Sizes

In [RAG pipelines](/blogs/rag-architecture-for-javascript-developers), retrieved chunks are injected into every prompt. Chunk size directly affects token cost per request.

```js
// Too large — wastes tokens on irrelevant content
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 2000, // 4 chunks × 2000 chars ≈ 8000 context tokens per query
  chunkOverlap: 200,
});

// More efficient
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 400,  // 4 chunks × 400 chars ≈ 1600 context tokens per query
  chunkOverlap: 40,
});
```

Halving chunk size can cut RAG prompt costs by 40–50%. Test retrieval quality on a representative sample before deploying — tighter chunks occasionally miss context that spans chunk boundaries.

## What to Optimize First

| Impact | Effort | Action |
|---|---|---|
| Very High | Low | Downgrade model for low-complexity features |
| Very High | Medium | Add exact caching for repeated prompts |
| High | Low | Set `max_tokens` per feature |
| High | Medium | Reduce system prompt length |
| Medium | Medium | Implement semantic caching |
| Medium | High | Batch API for background jobs |
| Medium | High | Tighten RAG chunk sizes |

Start with the top two rows. Model downgrade plus exact caching together typically cut monthly bills by 40–60% with minimal engineering effort and negligible quality impact.

The key discipline is to instrument first, optimize second. Without token-level cost data per feature, you'll optimize the wrong things. The [monitoring setup](/blogs/how-to-monitor-ai-pipelines-in-production) is the prerequisite — once you have the data, these strategies are straightforward to apply.
