---
title: 'Chroma vs Pinecone vs pgvector for RAG'
date: '2026-04-26'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'A practical comparison of Chroma, Pinecone, and pgvector for production RAG pipelines — covering setup, query performance, scalability, and cost.'
keyword: 'vector database comparison, Chroma vs Pinecone, pgvector Node.js, RAG vector store, vector database production, embeddings database, LangChain vector store'
topic: 'AI Engineering'
faq:
  - question: "What is a vector database and why do AI applications need one?"
    answer: "A vector database stores high-dimensional embeddings — numerical representations of text or images — and efficiently retrieves the most semantically similar entries to a query vector. AI applications, especially RAG pipelines, need vector databases to find relevant documents by meaning rather than keyword match."
  - question: "When should I use Chroma vs Pinecone vs pgvector?"
    answer: "Use Chroma for local development and prototypes — it runs in-process with no external service needed. Use Pinecone for managed production with millions of vectors and no ops overhead. Use pgvector when you're already on PostgreSQL and want to keep vector search within your existing database infrastructure."
  - question: "Is pgvector production-ready for RAG pipelines?"
    answer: "Yes, with the right configuration. pgvector with HNSW indexing handles millions of vectors at production query latencies under 50ms. It requires PostgreSQL 15+ and proper index tuning. The main advantage over managed vector databases is keeping your data in one place with existing PostgreSQL tooling."
  - question: "What embedding model should I use with a vector database?"
    answer: "OpenAI text-embedding-3-small (1536 dimensions) is the most widely used embedding model for production RAG systems. For Vertex AI apps, Google's text-embedding-004 is a strong alternative. Always use the same embedding model during ingestion and retrieval — mixing models breaks semantic search entirely."
  - question: "How many vectors can Pinecone handle?"
    answer: "Pinecone's serverless tier handles billions of vectors and scales automatically. The free tier supports roughly 100,000 vectors, which is sufficient for most prototypes and small production systems. Pinecone's managed infrastructure means you don't manage index tuning, hardware scaling, or availability."
---

Your [RAG pipeline](/blogs/rag-architecture-for-javascript-developers) needs somewhere to store and query embeddings. The three options most Node.js teams evaluate are Chroma, Pinecone, and pgvector. They solve the same problem at very different points on the complexity vs. control tradeoff.

This post covers each option with real setup code, and tells you exactly when to use which.

## What a Vector Database Actually Does

A vector database stores high-dimensional floating-point arrays (embeddings) and answers one query: *given this vector, which stored vectors are most similar?*

The similarity measure is almost always **cosine similarity** or **dot product** — not Euclidean distance, because high-dimensional space has counterintuitive geometry where Euclidean distance performs poorly.

Approximate Nearest Neighbor (ANN) algorithms like HNSW (Hierarchical Navigable Small World) make this search fast at scale. Every serious vector database implements some variant of HNSW internally.

## Chroma: The Local-First Option

Chroma is an open-source vector database designed for rapid development. It runs in-process or as a local server, requires no external services, and has first-class LangChain.js integration.

### Setup

```bash
npm install chromadb
# For server mode:
docker run -p 8000:8000 chromadb/chroma
```

### Usage with LangChain.js

```js
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { OpenAIEmbeddings } from '@langchain/openai';

const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });

// Create and populate
const vectorStore = await Chroma.fromDocuments(documents, embeddings, {
  collectionName: 'my-knowledge-base',
  url: 'http://localhost:8000',
});

// Query
const results = await vectorStore.similaritySearch('how does authentication work?', 4);
```

### When to Use Chroma

- **Local development** — no accounts, no billing, zero config
- **Prototyping RAG pipelines** before committing to infrastructure
- **Self-hosted production** if you're comfortable managing the operational overhead
- Budget where you'd rather pay for your own infrastructure than per-query charges

### Chroma Limits

- No built-in replication or high availability in the server version
- Limited metadata filtering compared to managed options
- Community support only — no enterprise SLA

## Pinecone: The Managed Production Option

Pinecone is a fully managed vector database with a REST API, no infrastructure to maintain, and automatic scaling. It's the fastest path from prototype to production.

### Setup

```bash
npm install @pinecone-database/pinecone
export PINECONE_API_KEY=...
export PINECONE_INDEX=your-index-name
```

### Create an Index

```js
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

await pinecone.createIndex({
  name: 'my-knowledge-base',
  dimension: 1536, // match your embedding model output dimension
  metric: 'cosine',
  spec: {
    serverless: {
      cloud: 'aws',
      region: 'us-east-1',
    },
  },
});
```

### Usage with LangChain.js

```js
import { PineconeStore } from '@langchain/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';

const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });
const index = pinecone.Index(process.env.PINECONE_INDEX);

const vectorStore = await PineconeStore.fromDocuments(documents, embeddings, {
  pineconeIndex: index,
  namespace: 'production',
});

// Query with metadata filter
const results = await vectorStore.similaritySearch('pricing question', 4, {
  filter: { category: { $eq: 'billing' } },
});
```

### Pinecone Pricing (as of 2026)

- Free tier: 1 index, 2GB storage, 100K query units/month — enough for development and small workloads
- Serverless: ~$0.10 per 1M query units, ~$0.033 per GB/month storage
- At 1M queries/month with 5GB stored: approximately $265/month

### When to Use Pinecone

- Production apps where you don't want to manage infrastructure
- You need strong **metadata filtering** for multi-tenant RAG (per-user document namespaces)
- High query volume with predictable SLA
- Teams that value operational simplicity over cost at scale

### Pinecone Limits

- Vendor lock-in — migrating requires re-embedding all your documents
- Cold start latency on the free tier
- Can get expensive at very high query volumes

## pgvector: The PostgreSQL Extension

pgvector adds a `vector` column type and ANN search to PostgreSQL. If you're already running Postgres, this is often the most practical production choice — you get vector search without adding a new operational dependency.

### Setup

```sql
-- Add the extension in PostgreSQL
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table with a vector column
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  embedding vector(1536)
);

-- Create an HNSW index for fast ANN search
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);
```

```bash
npm install @langchain/community pg
```

### Usage with LangChain.js

```js
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const vectorStore = await PGVectorStore.initialize(
  new OpenAIEmbeddings({ model: 'text-embedding-3-small' }),
  {
    pool,
    tableName: 'documents',
    columns: {
      idColumnName: 'id',
      vectorColumnName: 'embedding',
      contentColumnName: 'content',
      metadataColumnName: 'metadata',
    },
  }
);

// Use exactly like any other LangChain vector store
const results = await vectorStore.similaritySearch('your question', 4);
```

### pgvector's Real Advantage: SQL Joins

pgvector's biggest differentiator is that your vectors live alongside your relational data. This enables queries that are genuinely hard to replicate in a pure vector store:

```sql
-- Find most similar documents for users with an active subscription
SELECT d.content, d.embedding <=> $1 AS distance
FROM documents d
JOIN users u ON d.user_id = u.id
WHERE u.subscription_status = 'active'
ORDER BY distance
LIMIT 4;
```

### When to Use pgvector

- **You're already on PostgreSQL** — no new infra, single backup, familiar tooling
- You need **complex SQL joins** between vectors and relational data
- You want to avoid per-query charges from a managed service
- Self-hosted stack where adding another cloud dependency isn't acceptable

## Comparison Table

| Feature | Chroma | Pinecone | pgvector |
|---|---|---|---|
| Hosting | Self-hosted | Managed cloud | Self-hosted (Postgres) |
| Setup effort | Minimal | Minimal | Moderate |
| Scale (vectors) | Millions (self-managed) | Hundreds of millions | Tens of millions |
| Metadata filtering | Basic | Strong | Full SQL |
| Cost | Infrastructure only | Usage-based | Infrastructure only |
| LangChain.js support | First-class | First-class | First-class |
| Vendor lock-in | Low | High | None |
| Best for | Dev, prototyping | Managed production | Existing Postgres stack |

## Decision Guide

**Start with Chroma** if you're prototyping. Don't waste time on infrastructure decisions when you don't know your query patterns yet.

**Move to pgvector** if you're already running Postgres and your dataset fits in a single instance. The SQL join capability is genuinely hard to replicate in a pure vector store, and the operational simplicity of fewer services usually outweighs Pinecone's managed convenience.

**Choose Pinecone** if your dataset will grow beyond what you want to self-manage, you need enterprise SLAs, or your team doesn't want to own Postgres operations. For [AI agents](/blogs/langchainjs-agents-nodejs-tutorial) that need a shared knowledge base accessed from multiple services, Pinecone's managed REST API is particularly convenient.

Whatever you choose, benchmark your actual query patterns before committing. Synthetic benchmarks tell you almost nothing about real performance on your data — run similarity searches against a representative sample of your actual embeddings and measure p50/p95 latency at your expected volume.

To see how these stores fit into a complete pipeline, see [RAG Architecture for JavaScript Developers](/blogs/rag-architecture-for-javascript-developers). For monitoring retrieval quality in production — which chunks are being retrieved, how often, and whether they're actually relevant — see [How to Monitor AI Pipelines in Production](/blogs/how-to-monitor-ai-pipelines-in-production).

## Frequently Asked Questions

**What is a vector database and why do AI applications need one?**  
A vector database stores high-dimensional embeddings — numerical representations of text or images — and efficiently retrieves the most semantically similar entries to a query vector. AI applications, especially RAG pipelines, need vector databases to find relevant documents by meaning rather than keyword match.

**When should I use Chroma vs Pinecone vs pgvector?**  
Use Chroma for local development and prototypes — it runs in-process with no external service needed. Use Pinecone for managed production with millions of vectors and no ops overhead. Use pgvector when you're already on PostgreSQL and want to keep vector search within your existing database infrastructure.

**Is pgvector production-ready for RAG pipelines?**  
Yes, with the right configuration. pgvector with HNSW indexing handles millions of vectors at production query latencies under 50ms. It requires PostgreSQL 15+ and proper index tuning. The main advantage over managed vector databases is keeping your data in one place with your existing PostgreSQL tooling.

**What embedding model should I use with a vector database?**  
OpenAI `text-embedding-3-small` (1536 dimensions) is the most widely used embedding model for production RAG systems. For Vertex AI apps, Google's `text-embedding-004` is a strong alternative. Always use the same embedding model during ingestion and retrieval — mixing models breaks semantic search entirely.

**How many vectors can Pinecone handle?**  
Pinecone's serverless tier handles billions of vectors and scales automatically. The free tier supports roughly 100,000 vectors, which is sufficient for most prototypes and small production systems. Pinecone's managed infrastructure means you don't manage index tuning, hardware scaling, or availability zones.
