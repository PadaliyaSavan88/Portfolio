---
title: 'LangChain.js Agents Tutorial in Node.js'
date: '2026-04-27'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'A practical guide to building autonomous AI agents with LangChain.js in Node.js — tools, agent executors, memory, and real working code examples.'
keyword: 'LangChain.js agents, AI agents Node.js, LangChain tools, autonomous AI Node.js, LangChain agent executor, LangChain tutorial, ReAct agent'
topic: 'AI Engineering'
faq:
  - question: "What is a LangChain.js AI agent and how does it differ from a standard LLM call?"
    answer: "A standard LLM call sends a prompt and receives a completion. An agent gives the LLM access to tools — APIs, databases, calculators, search — and lets it decide which tools to call and in what order to complete a task. The LLM reasons in a loop (observe, think, act) until it reaches a final answer."
  - question: "What is the ReAct pattern used in LangChain.js agents?"
    answer: "ReAct (Reasoning + Acting) is the prompting pattern that makes agents work. The LLM outputs a thought (what it should do), an action (which tool to call with what input), reads the observation (tool result), and repeats until it can produce a final answer. LangChain.js implements this loop in its agent executor."
  - question: "What tools can I give a LangChain.js agent in Node.js?"
    answer: "You can give agents any function wrapped as a DynamicTool — web search, database queries, REST API calls, calculators, file readers, and custom business logic. LangChain also provides built-in tools for common tasks. The agent chooses which tool to use based on each tool's description string."
  - question: "How do I add memory to a LangChain.js agent?"
    answer: "Use BufferMemory or a custom memory class from LangChain and pass it to the AgentExecutor via the memory option. Memory stores conversation history so the agent can reference earlier tool results and user messages in subsequent turns. For production, persist memory to Redis or a database instead of in-memory."
  - question: "Can LangChain.js agents run autonomously without human input?"
    answer: "Yes, for fully automated pipelines. Set the maxIterations limit to prevent infinite loops and add error handling for tool failures. For tasks that affect external systems like sending emails or writing to databases, implement human-in-the-loop checkpoints before executing irreversible actions."
---

An LLM that answers questions is useful. An LLM that can *act* — call APIs, search the web, run code, query a database — is a product. That's what agents do, and LangChain.js is the fastest path to building them in Node.js.

This post covers what agents actually are, how LangChain.js structures them, and how to build a working agent that uses real tools.

## What Is an AI Agent?

An agent is an LLM with a decision loop. Instead of taking your prompt and returning a response, an agent:

1. Reads your request
2. Decides what action to take (call a tool, ask for more info, or respond directly)
3. Executes the action and observes the result
4. Loops back to step 2 until it has enough information to respond

The classic formulation is **ReAct** (Reason + Act): the model reasons about what to do, acts, observes the outcome, and reasons again. This is what separates agents from chains. A chain is a fixed sequence of steps. An agent is a dynamic loop — the model decides what steps to take and in what order.

## Setting Up LangChain.js

```bash
npm install langchain @langchain/openai @langchain/core @langchain/community
```

You'll need an OpenAI API key (or swap in [Vertex AI as the backend](/blogs/vertex-ai-setup-for-nodejs-apps) — LangChain.js supports both through a unified interface):

```bash
export OPENAI_API_KEY=sk-...
```

## Defining Tools

A tool is any function the agent can invoke. LangChain.js provides built-in tools and a clean interface to define your own.

### Built-in Tool: Web Search (SerpAPI)

```bash
npm install @langchain/community
export SERPAPI_API_KEY=your-key
```

```js
import { SerpAPI } from '@langchain/community/tools/serpapi';

const searchTool = new SerpAPI(process.env.SERPAPI_API_KEY, {
  location: 'United States',
  hl: 'en',
  gl: 'us',
});
```

### Custom Tool: Calculator

```js
import { DynamicTool } from '@langchain/core/tools';

const calculatorTool = new DynamicTool({
  name: 'calculator',
  description:
    'Evaluates a mathematical expression. Input should be a valid JavaScript math expression like "2 + 2" or "Math.sqrt(16)".',
  func: async (input) => {
    try {
      return String(eval(input));
    } catch (e) {
      return `Error: ${e.message}`;
    }
  },
});
```

### Custom Tool: Database Lookup

```js
const userLookupTool = new DynamicTool({
  name: 'user-lookup',
  description:
    "Look up a user by email address. Returns the user's name and account status. Input should be an email address.",
  func: async (email) => {
    const user = await db.users.findOne({ where: { email } });
    if (!user) return 'User not found';
    return JSON.stringify({ name: user.name, status: user.status, plan: user.plan });
  },
});
```

The `description` field is critical — it is what the LLM reads to decide when to use the tool. Write it like you are explaining the tool to a smart colleague, not a computer.

## Building the Agent Executor

```js
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent, AgentExecutor } from 'langchain/agents';
import { pull } from 'langchain/hub';

const llm = new ChatOpenAI({
  model: 'gpt-4o',
  temperature: 0,
});

const tools = [searchTool, calculatorTool, userLookupTool];

// Pull the standard ReAct prompt from LangChain Hub
const prompt = await pull('hwchase17/react');

const agent = await createReactAgent({ llm, tools, prompt });

const executor = new AgentExecutor({
  agent,
  tools,
  verbose: true,     // logs each step — disable in production
  maxIterations: 10, // prevents infinite loops
});
```

`temperature: 0` matters for agents — you want deterministic decisions about which tool to call, not creative variation.

## Running the Agent

```js
const result = await executor.invoke({
  input: "What is the square root of 144, and what is today's top tech news?",
});

console.log(result.output);
```

With `verbose: true`, you see the full ReAct trace:

```
Thought: I need to calculate the square root of 144 and find today's top tech news.
Action: calculator
Action Input: Math.sqrt(144)
Observation: 12
Thought: I have the math answer. Now I need to search for tech news.
Action: serpapi
Action Input: top tech news today
Observation: [search results...]
Thought: I have all the information needed.
Final Answer: The square root of 144 is 12. Today's top tech news includes...
```

## Adding Memory

Without memory, every agent invocation starts fresh. For multi-turn conversations, add a message buffer:

```js
import { BufferMemory } from 'langchain/memory';

const memory = new BufferMemory({
  memoryKey: 'chat_history',
  returnMessages: true,
});

const agentWithMemory = new AgentExecutor({
  agent,
  tools,
  memory,
  maxIterations: 10,
});

await agentWithMemory.invoke({ input: 'My email is john@example.com. Who am I?' });
await agentWithMemory.invoke({ input: 'What is my account status?' });
// The second invocation knows the email from the first turn
```

For production, swap `BufferMemory` with a persistent store — Redis or a database — so memory survives process restarts.

## Agents vs RAG: When to Use Which

Agents and [RAG pipelines](/blogs/rag-architecture-for-javascript-developers) are complementary, not competing patterns. The most powerful pattern is an agent with a RAG tool — the agent decides *when* to consult the knowledge base, rather than blindly retrieving on every query.

| Use Case | Pattern |
|---|---|
| Answer questions from a fixed knowledge base | RAG |
| Take action based on user input | Agent |
| Look up, transform, and synthesize information | Agent with RAG tool |
| Deterministic, predictable pipeline | Chain (no agent) |

You define a tool called `knowledge-base-search`, back it with a [vector database](/blogs/vector-database-comparison-chroma-pinecone-pgvector), and the agent calls it only when the question requires internal knowledge.

## Production Checklist

**Set `maxIterations`** — without a cap, a confused agent can loop forever and burn through tokens.

**Sanitize tool inputs** — the LLM generates tool inputs from user text; treat them like untrusted user input.

**Log every trace** — agents are non-deterministic; you need traces to debug failures. See [How to Monitor AI Pipelines in Production](/blogs/how-to-monitor-ai-pipelines-in-production) — LangSmith captures agent traces automatically when connected.

**Timeout your tools** — a slow external API can stall an agent indefinitely:

```js
const safeTool = new DynamicTool({
  name: 'safe-api-call',
  description: '...',
  func: async (input) => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Tool timeout')), 5000)
    );
    return Promise.race([yourApiCall(input), timeout]);
  },
});
```

**Rate limit your executor** — agents can make multiple LLM calls per user request; budget accordingly with your [chosen provider](/blogs/vertex-ai-setup-for-nodejs-apps).

Agents unlock a new category of AI features — not just Q&A but autonomous workflows, multi-step reasoning, and real integration with your existing systems. Start with well-defined tools and low `maxIterations` limits, then expand as you gain confidence in the system's behavior.

## Frequently Asked Questions

**What is a LangChain.js AI agent and how does it differ from a standard LLM call?**  
A standard LLM call sends a prompt and receives a completion. An agent gives the LLM access to tools — APIs, databases, calculators, search — and lets it decide which tools to call and in what order to complete a task. The LLM reasons in a loop (observe, think, act) until it reaches a final answer.

**What is the ReAct pattern used in LangChain.js agents?**  
ReAct (Reasoning + Acting) is the prompting pattern that makes agents work. The LLM outputs a thought (what it should do), an action (which tool to call with what input), reads the observation (tool result), and repeats until it can produce a final answer. LangChain.js implements this loop in the AgentExecutor.

**What tools can I give a LangChain.js agent in Node.js?**  
You can give agents any function wrapped as a `DynamicTool` — web search (via SerpAPI or Tavily), database queries, REST API calls, calculators, file readers, and custom business logic. The agent chooses which tool to use based on each tool's description string, so write clear and specific descriptions.

**How do I add memory to a LangChain.js agent?**  
Use `BufferMemory` or a custom memory class from LangChain and pass it to the `AgentExecutor` via the `memory` option. Memory stores conversation history so the agent can reference earlier tool results and user messages in subsequent turns. For production, persist memory to Redis or a database rather than keeping it in-process.

**Can LangChain.js agents run autonomously without human input?**  
Yes, for fully automated pipelines. Set a `maxIterations` limit to prevent infinite loops and add error handling for tool failures. For tasks that affect external systems — sending emails, writing to databases, calling payment APIs — implement human-in-the-loop checkpoints before executing irreversible actions.
