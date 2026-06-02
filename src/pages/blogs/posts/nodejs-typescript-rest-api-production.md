---
title: 'Node.js TypeScript REST API Guide'
date: '2026-06-01'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Build a production REST API with Node.js and TypeScript — typed routes, Zod validation, error middleware, and patterns that prevent runtime failures.'
dateModified: '2026-06-01'
keyword: 'TypeScript REST API, Node.js TypeScript API, Express TypeScript, typed Node.js backend, Zod validation Node.js, REST API production Node.js'
topic: 'Web Development'
faq:
  - question: "Should I use Express or Fastify for a TypeScript REST API in Node.js?"
    answer: "Both work well with TypeScript. Express has more ecosystem support and is familiar to most teams. Fastify is TypeScript-first, has built-in schema validation, and outperforms Express in throughput benchmarks. For a new production API in 2026, Fastify is worth evaluating. For teams who need fast onboarding or already know Express, Express with Zod achieves the same type safety with a gentler learning curve."
  - question: "How do I type Express request and response objects in TypeScript?"
    answer: "Use generics on the RequestHandler type: RequestHandler<Params, ResBody, ReqBody, Query>. For example, RequestHandler<{ id: string }, UserResponse, never, never> types the id param and response shape. Define the generics once per route file and reuse across handlers."
  - question: "What is the best way to validate request bodies in a Node.js TypeScript API?"
    answer: "Zod is the standard choice. Define a schema, call schema.safeParse(req.body), and return 400 with field-level errors on failure. Use z.infer<typeof Schema> to derive the TypeScript type — one schema gives you both runtime validation and compile-time types without duplication."
  - question: "How should I handle errors in an Express TypeScript API?"
    answer: "Create an AppError class that extends Error with a statusCode property. Throw AppError instances in route handlers for expected errors. Register a four-argument error middleware last — it catches AppError and unknown errors and returns consistent JSON responses. Call next(err) from async handlers so errors reach the middleware."
  - question: "How do I type environment variables in a Node.js TypeScript project?"
    answer: "Validate process.env with a Zod schema at startup and export the result as a typed config object. Every config.SOME_VAR is typed as string or number — not string | undefined. The app fails immediately on startup if a required variable is missing rather than throwing a cryptic error in production."
---

A TypeScript REST API without runtime validation is half-typed. TypeScript catches shape errors at compile time, but request bodies arrive as `unknown` at the API boundary — the types are gone by then. The correct pattern combines TypeScript for static analysis with Zod for runtime validation, giving you compile-time safety and runtime guarantees from a single schema definition.

## Project Setup

Start with strict TypeScript configuration and Express type definitions:

```bash
npm init -y
npm install express
npm install -D typescript ts-node @types/node @types/express
npm install zod
```

Configure `tsconfig.json` with strict mode enabled:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

`strict: true` enables `strictNullChecks`, `noImplicitAny`, and several other checks. Without it, TypeScript silently allows `any` to propagate through request handlers — defeating the purpose.

If you're still weighing whether TypeScript is worth it for your project, [JavaScript vs TypeScript: the practical tradeoffs](/blogs/type-or-not-to-type-the-javascript-vs-typescript-dilemma) covers the decision without hype.

## Typed Route Handlers

Express's `RequestHandler` generic accepts four type parameters: `Params`, `ResBody`, `ReqBody`, `Query`. Define them explicitly per route:

```typescript
import { RequestHandler } from 'express';

interface UserParams {
  id: string;
}

interface UserResponse {
  id: string;
  email: string;
  createdAt: string;
}

export const getUser: RequestHandler<UserParams, UserResponse> = async (req, res, next) => {
  try {
    const { id } = req.params; // typed as string
    const user = await db.users.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' } as any);
      return;
    }
    res.json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    });
  } catch (err) {
    next(err);
  }
};
```

TypeScript will flag any response that doesn't conform to `UserResponse`. The `as any` on the 404 is intentional — error shapes don't match the success schema, and making that explicit is cleaner than unioning every response.

## Runtime Validation with Zod

TypeScript types don't exist at runtime. A body declared as `{ email: string }` is still `unknown` when it arrives. Zod bridges the gap:

```typescript
import { z } from 'zod';
import { RequestHandler } from 'express';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(1).max(100).optional(),
});

type CreateUserBody = z.infer<typeof CreateUserSchema>;

export const createUser: RequestHandler<{}, {}, CreateUserBody> = async (req, res, next) => {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: 'Invalid request body',
      details: result.error.flatten().fieldErrors,
    });
    return;
  }

  const { email, password, name } = result.data; // fully typed
  // ... create user
};
```

`safeParse` returns `{ success: true, data: T }` or `{ success: false, error: ZodError }` — no exceptions thrown. `result.error.flatten().fieldErrors` produces per-field error messages ready to return to the client:

```json
{
  "error": "Invalid request body",
  "details": {
    "email": ["Invalid email"],
    "password": ["String must contain at least 8 character(s)"]
  }
}
```

## Typed Environment Variables

Without intervention, every `process.env.DATABASE_URL` is `string | undefined`. Validate and type your config once at startup:

```typescript
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

export const config = EnvSchema.parse(process.env);
// config.DATABASE_URL → string (not string | undefined)
// config.PORT → number
```

If any required variable is missing or the wrong format, `EnvSchema.parse` throws immediately at startup. The app never starts in a broken state, and `string | undefined` is eliminated throughout the codebase.

## Centralized Error Handling

Express error middleware has a four-argument signature — `(err, req, res, next)` — which distinguishes it from regular middleware:

```typescript
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
```

Register it last, after all routes:

```typescript
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use(errorHandler); // must be last
```

Throw `new AppError(404, 'User not found')` in route handlers. Pass unexpected errors to `next(err)`. The middleware produces consistent JSON error shapes across the entire API.

## Auth Middleware with Declaration Merging

Attaching a typed user to `req` requires declaration merging — extending the Express `Request` type in your own `.d.ts` file:

```typescript
// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: 'admin' | 'user';
      };
    }
  }
}
```

Now `req.user` is typed in every handler:

```typescript
export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Missing token' });
    return;
  }
  try {
    req.user = await verifyJWT(token);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const getProfile: RequestHandler = (req, res) => {
  if (!req.user) { res.status(401).json({ error: 'Unauthorized' }); return; }
  res.json({ id: req.user.id, email: req.user.email }); // fully typed
};
```

No casting, no `as any` — the type is available everywhere `req` is.

## Entity IDs

Auto-increment integers expose internal record counts in URLs — `/users/4231` tells an attacker you have roughly 4,231 users. Use UUIDs for any ID that appears in an API response or URL. `crypto.randomUUID()` is built into Node.js since version 14.17 and requires no package:

```typescript
import { randomUUID } from 'crypto';

const userId = randomUUID(); // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

For database primary keys in write-heavy tables, UUID v7 (from the `uuid` package) is preferable — it embeds a timestamp that keeps B-tree indexes efficient. See [UUID v4 in JavaScript: when to use one](/blogs/uuid-explained-when-to-use-javascript) for the full comparison.

## Connecting to the AI Stack

The same TypeScript patterns — Zod schemas, typed interfaces, strict tsconfig — apply directly to AI-powered APIs. If your REST API makes calls to OpenAI or Vertex AI, typing the LLM responses is where runtime failures most often occur. [TypeScript for AI Apps in Node.js](/blogs/typescript-for-ai-applications-nodejs) covers exactly that: how to type SDK responses, use structured outputs, and validate AI-generated JSON with Zod.

For production observability — tracking request latency, error rates, and slow endpoints — the patterns in [How to Monitor AI Pipelines in Production](/blogs/how-to-monitor-ai-pipelines-in-production) apply equally to standard REST APIs.

## Frequently Asked Questions

**Should I use Express or Fastify for a TypeScript REST API in Node.js?**  
Both work well. Express has wider ecosystem support and familiarity — the patterns above apply directly. Fastify is TypeScript-first, has built-in schema validation with JSON Schema, and significantly outperforms Express in throughput benchmarks. For a new API where performance matters, Fastify is worth evaluating. For teams who need fast ramp-up or already know Express, Express with Zod gives the same type safety with a lower learning curve.

**How do I type Express request and response objects in TypeScript?**  
Use `RequestHandler<Params, ResBody, ReqBody, Query>` from `express`. Fill in each generic: `RequestHandler<{ id: string }, UserResponse, never, never>` types the id param and response shape. Define them once in shared interface files and reuse across handlers in the same router.

**What is the best way to validate request bodies in a Node.js TypeScript API?**  
Zod. Define a schema, call `schema.safeParse(req.body)`, and return 400 with field errors if validation fails. Use `z.infer<typeof Schema>` to derive the TypeScript type automatically — one schema, no duplication. The alternative — manual type assertions — silently accepts invalid data whenever the client sends an unexpected shape.

**How should I handle errors in an Express TypeScript API?**  
Create an `AppError` class that extends `Error` with a `statusCode` field. Throw `AppError` in route handlers for expected errors (404, 400, 403). Register a four-argument error middleware last — it catches `AppError` and unknown errors and returns consistent JSON. For async handlers, always call `next(err)` for unexpected errors rather than letting them become unhandled promise rejections.

**How do I type environment variables in a Node.js TypeScript project?**  
Validate `process.env` with a Zod schema at startup and export the typed result. Every `config.SOME_VAR` is `string` or `number` — not `string | undefined`. If a required variable is missing, the app throws immediately on startup with a clear validation error rather than failing silently at runtime when the variable is first accessed.
