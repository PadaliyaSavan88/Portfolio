---
title: 'MCP Explained: AI Agents Meet Your Tools'
date: '2026-08-26'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'What the Model Context Protocol (MCP) is, how it works, and how to build a minimal MCP server in Node.js to connect AI agents to your tools.'
keyword: 'model context protocol, MCP server, what is MCP, MCP Node.js, Anthropic MCP, AI agent tools protocol, MCP vs LangChain'
topic: 'AI Engineering'
faq:
  - question: "What is the Model Context Protocol (MCP)?"
    answer: "MCP is an open protocol, introduced by Anthropic, that standardizes how AI applications connect to external tools, data sources, and systems. Instead of writing a custom integration for every AI app that needs to talk to every tool, MCP defines one interface: a server exposes tools, resources, and prompts, and any MCP-compatible client (Claude, an IDE, a custom agent) can use them without app-specific glue code."
  - question: "What problem does MCP actually solve?"
    answer: "Before MCP, connecting M AI applications to N external tools meant writing roughly M×N custom integrations — one per app-per-tool pairing. MCP turns that into M+N: each tool is exposed once as an MCP server, and each AI application implements the client side once. Adding a new tool or a new AI app no longer means rewriting every existing integration."
  - question: "What is the difference between an MCP tool, a resource, and a prompt?"
    answer: "A tool is an action the AI can invoke, like a function call — send an email, query a database, run a search. A resource is data the AI can read, like a file or a database record, without side effects. A prompt is a reusable, parameterized instruction template the server exposes for common tasks. Tools do things; resources provide context; prompts standardize instructions."
  - question: "How is MCP different from LangChain.js tools?"
    answer: "LangChain.js tools are defined inside your application code and only work with that specific agent framework. MCP servers are standalone processes that expose tools over a standard protocol, usable by any MCP client — Claude Desktop, an IDE, or a LangChain.js agent wrapped with an MCP client adapter. They're complementary: you can wrap an MCP server as a LangChain tool, getting reuse across every AI application you build instead of rewriting the integration each time."
  - question: "Do I need MCP for a simple AI feature?"
    answer: "No. If you're calling one API from one AI feature in one codebase, a direct function call or a LangChain DynamicTool is simpler and has less overhead. MCP earns its complexity when the same tool needs to be used by multiple AI applications — Claude Desktop, an internal agent, a CLI assistant — or when you're building a tool meant to be reused across projects and teams."
---

MCP (Model Context Protocol) is an open protocol, introduced by Anthropic, for connecting AI applications to external tools, data, and systems through one standard interface instead of a custom integration per app-per-tool pairing. This post covers what problem it actually solves, how the pieces fit together, and how to build a minimal MCP server in Node.js.

## What Problem Does MCP Solve?

Before a standard existed, every AI application that needed to read your database, call your internal API, or touch your filesystem needed its own bespoke integration. Ten AI tools, ten internal systems — that's up to 100 custom integrations, each one maintained separately, each one breaking independently when either side changes.

MCP collapses that from an M×N problem to an M+N one. A tool owner builds one MCP server exposing that tool. An AI application implements the MCP client side once. From then on, any MCP-compatible AI application can use any MCP server without app-specific glue code. This is the same shape of problem [LangChain.js agents](/blogs/langchainjs-agents-nodejs-tutorial) solve for a single application — MCP solves it across applications.

## How MCP Works: Hosts, Clients, and Servers

MCP has three roles:

- **Host** — the AI application the user interacts with (Claude Desktop, an IDE, a custom agent).
- **Client** — lives inside the host, holds a 1:1 connection to a server, and handles the protocol messages.
- **Server** — a separate process that exposes tools, resources, and prompts over the protocol.

Communication runs on JSON-RPC 2.0, over one of two transports: **stdio** for local servers (the host spawns the server as a subprocess and talks over stdin/stdout) or **Streamable HTTP** for remote servers reachable over a network. A host can hold connections to many servers at once, giving the AI a combined toolbox drawn from every connected server.

## The Three MCP Primitives: Tools, Resources, and Prompts

**Tools** are actions the model can invoke — the MCP equivalent of a function call. Sending an email, running a query, triggering a workflow. Each tool declares a name, a description, and a JSON Schema for its inputs, which the model reads to decide when and how to call it — the same principle as writing clear tool descriptions in [LangChain.js](/blogs/langchainjs-agents-nodejs-tutorial).

**Resources** are data the host can read into context — a file, a database record, a config value — without side effects. Resources are for information; tools are for action.

**Prompts** are reusable, parameterized instruction templates a server exposes, letting a team standardize how a task is described to the model instead of every user re-writing the same instructions from scratch.

## Building a Minimal MCP Server in Node.js

```bash
npm install @modelcontextprotocol/sdk zod
```

```js
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'order-lookup-server',
  version: '1.0.0',
});

server.tool(
  'lookup-order',
  'Look up an order by its ID. Returns status, items, and shipping details.',
  { orderId: z.string().describe('The order ID to look up') },
  async ({ orderId }) => {
    const order = await db.orders.findOne({ where: { id: orderId } });
    if (!order) {
      return { content: [{ type: 'text', text: 'Order not found' }] };
    }
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: order.status,
            items: order.items,
            shipping: order.shippingAddress,
          }),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

This server exposes one tool, `lookup-order`, to any MCP client that connects to it. Point Claude Desktop or a custom host at this process over stdio, and the model can now look up real orders — without that host ever needing order-database-specific code.

The `description` field matters as much here as it does for [a LangChain tool](/blogs/langchainjs-agents-nodejs-tutorial) — it's what the model reads to decide whether this tool is relevant to the current request.

## MCP vs. LangChain.js Tools: How Do They Relate?

They're not competing — they operate at different layers.

| | Scope | Reusable across apps | Setup overhead |
|---|---|---|---|
| LangChain `DynamicTool` | Inside one app | No | Low |
| MCP server | Standalone process | Yes | Higher |

A LangChain `DynamicTool` is the fastest path when the tool only needs to exist inside one agent, in one codebase. An MCP server is worth the extra setup when the same tool should be usable from Claude Desktop, an internal agent, and a teammate's CLI assistant without three separate implementations. You can also bridge the two: wrap an MCP server behind a LangChain tool adapter, giving a LangChain.js agent access to your whole MCP toolbox alongside its native tools.

## Where MCP Fits in a Production AI Stack

MCP is a connection layer, not a replacement for [RAG](/blogs/rag-architecture-for-javascript-developers) or your existing pipeline. A retrieval system can be exposed as an MCP resource, giving any connected host access to the same knowledge base without re-implementing the retrieval logic per application. As with any tool-calling system, log every call — see [How to Monitor AI Pipelines in Production](/blogs/how-to-monitor-ai-pipelines-in-production) for the observability patterns that apply just as much to MCP tool invocations as to direct API calls.

Start with a single MCP server for the one integration that's genuinely needed by more than one AI surface in your stack. Adding MCP everywhere by default is unnecessary overhead for a tool that only ever needs to exist in one place.

## Frequently Asked Questions

**What is the Model Context Protocol (MCP)?**
MCP is an open protocol, introduced by Anthropic, that standardizes how AI applications connect to external tools, data sources, and systems. A server exposes tools, resources, and prompts once, and any MCP-compatible client can use them without app-specific glue code.

**What problem does MCP actually solve?**
Before MCP, connecting M AI applications to N external tools meant roughly M×N custom integrations. MCP turns that into M+N — each tool is exposed once, each AI application implements the client side once.

**What is the difference between an MCP tool, a resource, and a prompt?**
A tool is an action the AI can invoke. A resource is data the AI can read without side effects. A prompt is a reusable, parameterized instruction template. Tools do things; resources provide context; prompts standardize instructions.

**How is MCP different from LangChain.js tools?**
LangChain.js tools live inside your application code and only work with that agent framework. MCP servers are standalone processes usable by any MCP client. They're complementary — an MCP server can be wrapped as a LangChain tool.

**Do I need MCP for a simple AI feature?**
No. If one AI feature in one codebase needs one API call, a direct function call or a LangChain `DynamicTool` is simpler. MCP earns its complexity when the same tool needs to be reused across multiple AI applications.
