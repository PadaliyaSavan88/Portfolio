---
title: "Build a Production-Ready Express API with Claude Code's /backend Skill"
date: '2026-06-05'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Step-by-step tutorial: scaffold a complete Express + TypeScript API using the api-forge /backend skill in Claude Code. Covers setup, architecture, validation, error handling, and adding resources.'
dateModified: '2026-06-05'
keyword: 'express typescript api tutorial, api-forge tutorial, claude code backend skill, express rest api scaffold, nodejs typescript rest api, zod validation express, express error handling, winston logging nodejs, 3-layer architecture nodejs'
topic: 'Web Development'
faq:
  - question: "What does the /backend skill generate for a new Express project?"
    answer: "The /backend skill generates a complete Express + TypeScript project with a 3-layer architecture (Controller → Service → Model), Zod validation in the service layer, named error classes, a centralized config module with startup validation, Winston logging, a consistent { success, data, message } response format, pagination helpers, graceful shutdown handling, and Helmet security headers. Optional features include ESLint/Prettier, Husky, rate limiting, Swagger, PM2, and Docker."
  - question: "How do I add a new resource to an existing api-forge project?"
    answer: "Open Claude Code in your project and run /backend. Choose the 'extend' mode when prompted. Describe the resource you want to add — its name, fields, and any relationships. The skill reads your existing codebase and generates a Controller, Service, and Model that match your current patterns and naming conventions."
  - question: "Where does Zod validation go in the api-forge architecture?"
    answer: "In the Service layer. Controllers parse the raw request and pass data to the service. The service validates with Zod and throws a ValidationError if the input is invalid. This keeps validation logic co-located with business logic and makes it reusable from non-HTTP entry points like queue workers or scripts."
  - question: "How does api-forge handle errors consistently across the API?"
    answer: "api-forge sets up named error classes (ValidationError, NotFoundError, UnauthorizedError, ForbiddenError) and a centralized error-handling middleware that maps each class to the correct HTTP status code. Controllers just throw — the middleware catches and formats the response uniformly."
  - question: "Does api-forge support different databases?"
    answer: "Yes. During the /backend setup, you choose your database. The skill generates Model files with the appropriate client (Prisma, Mongoose, pg, Drizzle, etc.) configured and ready to use. The Controller and Service layers are database-agnostic by design."
---

This is a hands-on walkthrough of using the [api-forge](https://github.com/PadaliyaSavan88/api-forge) `/backend` skill to scaffold a complete production-ready Express + TypeScript API from scratch. By the end you will have a working project with proper layering, validation, error handling, logging, and a resource endpoint — all generated in a single Claude Code session.

If you have not installed api-forge yet, see [Stop Scaffolding by Hand: Meet api-forge for Claude Code](/blogs/api-forge-claude-code-backend-skill) for the 30-second install.

## Prerequisites

- Node.js 18+
- Claude Code installed ([claude.ai/code](https://claude.ai/code))
- api-forge installed: `npx skills add PadaliyaSavan88/api-forge`

## Step 1: Start the Skill

Create an empty directory for your project and open Claude Code inside it:

```bash
mkdir my-api && cd my-api
claude
```

Type `/backend` in the Claude Code prompt. The skill introduces itself and asks which mode you want:

```
1. New project — scaffold from scratch
2. Align existing project — bring an existing codebase to the pattern
3. Extend current project — add a new resource
```

Choose **1** for a new project.

## Step 2: Answer the Setup Questions

The skill asks 13 questions to configure the project. Here is what each one does:

| Question | Example | What it controls |
|----------|---------|------------------|
| Project name | `my-api` | Package name, log prefix |
| Description | `User management API` | package.json description |
| Port | `3000` | Default port in config |
| Database | `PostgreSQL + Prisma` | Model layer client |
| Auth strategy | `JWT` | Auth middleware and error types |
| Rate limiting | `Yes` | express-rate-limit wired to all routes |
| Health check | `Yes` | GET /health endpoint |
| Swagger docs | `Yes` | swagger-jsdoc + swagger-ui-express |
| ESLint + Prettier | `Yes` | .eslintrc, .prettierrc, lint scripts |
| Husky hooks | `Yes` | Pre-commit lint + type check |
| Testing framework | `Vitest` | vitest config, test folder scaffold |
| PM2 | `No` | ecosystem.config.js |
| Docker | `Yes` | Dockerfile + docker-compose.yml |

You do not have to answer perfectly — the skill explains each option if you ask, and you can change config values manually after generation.

## Step 3: The Generated Structure

After answering the questions, the skill scaffolds this structure:

```
my-api/
├── src/
│   ├── config/
│   │   └── index.ts          # Centralized env config with startup validation
│   ├── controllers/
│   │   └── health.controller.ts
│   ├── services/
│   │   └── health.service.ts
│   ├── models/               # DB query layer (Prisma client here)
│   ├── middleware/
│   │   ├── error.middleware.ts   # Central error handler
│   │   ├── auth.middleware.ts    # JWT verification
│   │   └── validate.middleware.ts
│   ├── errors/
│   │   └── index.ts          # Named error classes
│   ├── utils/
│   │   ├── logger.ts         # Winston setup
│   │   ├── response.ts       # { success, data, message } helper
│   │   └── pagination.ts     # Page/limit helpers
│   ├── routes/
│   │   └── index.ts          # Route registry
│   └── app.ts                # Express app setup (no listen())
├── server.ts                 # Entry point (calls app.listen + graceful shutdown)
├── prisma/
│   └── schema.prisma
├── .env.example
├── tsconfig.json
├── package.json
└── Dockerfile
```

The split between `app.ts` and `server.ts` is intentional — it makes the app testable without binding a port.

## Step 4: Understanding the Key Patterns

### Config with Startup Validation

The `src/config/index.ts` file reads all environment variables and validates them at startup:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  console.error(parsed.error.format());
  process.exit(1);
}

export const config = parsed.data;
```

If `DATABASE_URL` is missing or malformed, the app exits immediately at startup with a clear error message — not when the first database query fires at 3am.

### Named Error Classes

Instead of scattered `res.status(404).json(...)` calls, the skill sets up an errors module:

```typescript
// src/errors/index.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}
```

The central error middleware maps these to responses:

```typescript
// src/middleware/error.middleware.ts
import { AppError } from '../errors';
import { logger } from '../utils/logger';

export function errorMiddleware(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR',
  });
}
```

Every controller just throws. The middleware handles the rest.

### The 3-Layer Pattern in Action

Here is what a typical resource looks like across the three layers:

```typescript
// Controller — HTTP only
export class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    res.json(success(user));
  }
}

// Service — business logic + validation
export class UserService {
  async getUserById(id: string) {
    if (!id) throw new ValidationError('User ID is required');

    const user = await UserModel.findById(id);
    if (!user) throw new NotFoundError('User not found');

    return user;
  }
}

// Model — queries only
export const UserModel = {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
};
```

The controller knows about HTTP. The service knows about the domain. The model knows about the database. None of them know about each other's concerns.

## Step 5: Adding a Resource with `/backend --extend`

Once your project is set up, adding a new resource is one more `/backend` invocation. In Claude Code:

```
/backend
```

Choose **3 (Extend current project)**. Describe what you want:

```
Add a Posts resource. A post has a title (string, required), body (string, required),
authorId (UUID, required), and publishedAt (nullable datetime). Include full CRUD:
list with pagination, get by ID, create, update, delete.
```

The skill reads your project, sees your existing patterns (your Prisma schema, your error classes, your response helper), and generates:

- `src/controllers/post.controller.ts`
- `src/services/post.service.ts`  
- `src/models/post.model.ts`
- `src/routes/post.routes.ts`
- Prisma model added to `schema.prisma`
- Zod schemas for create and update payloads

All generated code matches your project's style: same import format, same response helper, same error classes, same pagination pattern.

## Step 6: Running the API

```bash
npm install
cp .env.example .env   # Fill in DATABASE_URL and JWT_SECRET
npx prisma migrate dev  # If using Prisma
npm run dev
```

Hit the health check:

```bash
curl http://localhost:3000/health
# { "success": true, "data": { "status": "ok", "uptime": 1.2 }, "message": "OK" }
```

If you enabled Swagger, the docs are at `http://localhost:3000/api-docs`.

## What You Get Without Writing It Yourself

Running `/backend` for a new project gives you all of this without touching a line of boilerplate:

- Structured project layout enforced by convention, not documentation
- Config validation that fails fast instead of silently
- Error classes that map cleanly to HTTP status codes
- Consistent `{ success, data, message }` responses across every endpoint
- Winston logging with no `console.log` in production code
- Pagination baked into every list endpoint from day one
- Graceful SIGTERM handling for zero-downtime deploys
- Helmet security headers on every response
- Health check endpoint ready for load balancer probes

The goal is to eliminate the gap between "new project" and "project following good patterns" — that gap is where bad habits form and tech debt starts accumulating before the first feature ships.

## Frequently Asked Questions

**What does the /backend skill generate for a new Express project?**
A complete Express + TypeScript project with 3-layer architecture, Zod validation, named error classes, centralized config with startup validation, Winston logging, consistent response formatting, pagination helpers, graceful shutdown, and Helmet headers. Optional features include ESLint/Prettier, Husky, rate limiting, Swagger, PM2, and Docker.

**How do I add a new resource to an existing api-forge project?**
Open Claude Code in your project and run `/backend`. Choose the extend mode. Describe the resource — name, fields, relationships. The skill reads your existing codebase and generates a Controller, Service, and Model that match your current patterns and naming conventions exactly.

**Where does Zod validation go in the api-forge architecture?**
In the Service layer. Controllers parse the raw request and pass data to the service. The service validates with Zod and throws a `ValidationError` if the input is invalid. This keeps validation logic co-located with business logic and makes it reusable from non-HTTP entry points.

**How does api-forge handle errors consistently across the API?**
Named error classes (`ValidationError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`) and a centralized error middleware that maps each class to the correct HTTP status code. Controllers just throw — the middleware catches and formats the response uniformly.

**Does api-forge support different databases?**
Yes. During setup you choose your database. The skill generates Model files with the appropriate client (Prisma, Mongoose, pg, Drizzle) configured and ready. The Controller and Service layers are database-agnostic by design.
