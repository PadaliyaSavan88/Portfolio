---
title: 'RAG Architecture for JavaScript Developers'
date: '2026-03-15'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'A practical guide to building Retrieval Augmented Generation (RAG) pipelines using JavaScript, LangChain.js, and OpenAI — with working Node.js code examples.'
keyword: 'RAG, Retrieval Augmented Generation, JavaScript, LangChain, OpenAI, Node.js, vector database, embeddings, AI development'
---


Large Language Models are impressive, but they have a fundamental problem: they only know what they were trained on. Ask GPT-4 about your internal product documentation, your company's support tickets, or a PDF uploaded last week, and it will either hallucinate or politely tell you it doesn't know. **Retrieval Augmented Generation (RAG)** solves this by grounding LLM responses in your own data — and as a JavaScript developer, you can build a production-ready RAG pipeline with LangChain.js and OpenAI.

## What Is RAG and Why Does It Matter?

RAG is a pattern where you retrieve relevant chunks of text from a knowledge base and inject them into the LLM prompt as context before generating a response. The model isn't "learning" new information — it's reading it in real time, much like you'd hand someone a document and say "answer this question based on what's in here."

This approach gives you three key benefits:

- **Accuracy** — responses are grounded in real, verifiable source text
- **Freshness** — your knowledge base can be updated without retraining the model
- **Control** — you decide what the model can and cannot access

## The RAG Pipeline: 5 Stages

1. **Load** — ingest source documents (PDFs, markdown, web pages, databases)
2. **Chunk** — split documents into smaller, semantically meaningful pieces
3. **Embed** — convert each chunk into a vector using an embedding model
4. **Store** — save vectors in a vector database (Chroma, Pinecone, pgvector, etc.)
5. **Retrieve & Generate** — at query time, embed the user's question, find the closest chunks, and pass them to the LLM

## Setting Up LangChain.js

Install the required packages:

```bash
npm install langchain @langchain/openai @langchain/community chromadb
```

Set your OpenAI API key:

```bash
export OPENAI_API_KEY=sk-...
```

## Loading and Chunking Documents

```js
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const loader = new TextLoader('./docs/product-guide.txt');
const rawDocs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

const docs = await splitter.splitDocuments(rawDocs);
console.log(`Created ${docs.length} chunks`);
```

The `chunkOverlap` parameter ensures context isn't lost at chunk boundaries — a 50-character overlap between adjacent chunks prevents sentences from being split in a way that loses meaning.

## Embedding and Storing in a Vector Store

For development, you can use Chroma running locally via Docker:

```bash
docker run -p 8000:8000 chromadb/chroma
```

Then store your chunks:

```js
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { OpenAIEmbeddings } from '@langchain/openai';

const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small', // cheaper than ada-002, better quality
});

const vectorStore = await Chroma.fromDocuments(docs, embeddings, {
  collectionName: 'product-docs',
  url: 'http://localhost:8000',
});

console.log('Documents embedded and stored.');
```

## The Full Query Pipeline

```js
import { ChatOpenAI } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { Chroma } from '@langchain/community/vectorstores/chroma';
import { OpenAIEmbeddings } from '@langchain/openai';

async function answerQuestion(question) {
  const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-small' });

  const vectorStore = await Chroma.fromExistingCollection(embeddings, {
    collectionName: 'product-docs',
    url: 'http://localhost:8000',
  });

  const retriever = vectorStore.asRetriever({
    k: 4, // return top 4 most relevant chunks
  });

  const llm = new ChatOpenAI({
    model: 'gpt-4o',
    temperature: 0,
  });

  const chain = RetrievalQAChain.fromLLM(llm, retriever, {
    returnSourceDocuments: true,
  });

  const result = await chain.invoke({ query: question });

  console.log('Answer:', result.text);
  console.log('Sources:', result.sourceDocuments.map(d => d.metadata.source));
  return result;
}

await answerQuestion('What is the refund policy for annual subscriptions?');
```

Setting `temperature: 0` is critical for RAG — you want the model to stay close to the retrieved facts, not get creative.

## RAG vs Fine-Tuning: When to Use Which

| Scenario | RAG | Fine-Tuning |
|---|---|---|
| Knowledge changes frequently | Yes | No |
| Need source attribution | Yes | No |
| Small budget | Yes | No (expensive) |
| Need to change response style/format | No | Yes |
| Domain-specific reasoning patterns | No | Yes |
| Low latency, offline inference | No | Yes |

The general rule: **use RAG for knowledge, use fine-tuning for behavior.** In most production SaaS applications, RAG is the right starting point.

## Production Tips

### Chunking Strategy

Chunk size dramatically affects quality. Too large (>1000 chars) and retrieved chunks contain irrelevant noise. Too small (<100 chars) and individual chunks lose context.

- For FAQ documents: 300–500 characters with 50 overlap
- For technical documentation: 600–800 characters with 100 overlap
- For legal or dense prose: use semantic chunking instead of fixed-size

### Metadata Filtering

Always attach metadata to your chunks so you can filter at retrieval time:

```js
const docs = rawDocs.map(doc => ({
  ...doc,
  metadata: {
    ...doc.metadata,
    category: 'billing',
    version: 'v2',
    lastUpdated: '2026-01',
  },
}));
```

Then filter during retrieval:

```js
const retriever = vectorStore.asRetriever({
  k: 4,
  filter: { category: 'billing' },
});
```

This prevents a question about billing from retrieving chunks about unrelated topics like onboarding or feature announcements.

### Hybrid Search

For production, consider combining vector search (semantic similarity) with keyword search (BM25). This handles edge cases where the user's query uses exact technical terms that semantic search might miss. Some vector databases like Weaviate and Elasticsearch support this natively.

RAG is one of the most practical AI patterns available today. Once you have the pipeline running, you can power internal knowledge bases, customer support bots, document Q&A tools, and much more — all without retraining a single model.
