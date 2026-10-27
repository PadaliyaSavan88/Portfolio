---
title: 'api-forge: Claude Code Express API Skill'
date: '2026-06-03'
dateModified: '2026-10-27'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'api-forge is a free Claude Code skill that scaffolds production-ready Express + TypeScript APIs. Install it, run /backend, and follow this walkthrough.'
keyword: 'api-forge, Claude Code skill, Express TypeScript scaffold, express typescript api tutorial, claude code backend skill, backend boilerplate, zod validation express, express error handling, 3-layer architecture nodejs'
topic: 'Web Development'
faq:
  - question: "What is api-forge?"
    answer: "api-forge is a free, open source collection of Claude Code skills for scaffolding production-grade backend APIs. Its /backend skill sets up or extends an Express + TypeScript API using a 3-layer architecture (Controller, Service, Model) with Zod validation, Winston logging, named error classes and a consistent response format, all enforced from the first commit. The source is at github.com/PadaliyaSavan88/api-forge."
  - question: "How do I install api-forge?"
    answer: "Run `npx skills add PadaliyaSavan88/api-forge` in your terminal. Skills install to ~/.claude/commands/. Restart Claude Code after installation and the /backend command is available in any project."
  - question: "Does api-forge work on existing projects?"
    answer: "Yes. The /backend skill has three modes: scaffold a new project, align an existing project to the pattern, or extend a current project with a new resource. To add a resource, choose the extend mode and describe its name, fields and relationships; the skill reads your codebase and generates a Controller, Service and Model that match your existing conventions."
  - question: "Where does Zod validation go in the api-forge architecture?"
    answer: "In the Service layer. Controllers handle HTTP only: they parse the request and pass data to a service. The service validates with Zod and throws a ValidationError if the input is invalid. Keeping validation next to business logic makes it reusable from non-HTTP entry points such as queue workers, CLI scripts or scheduled jobs."
  - question: "How does api-forge handle errors consistently across the API?"
    answer: "It sets up named error classes (ValidationError, NotFoundError, UnauthorizedError, ForbiddenError) and one centralized error middleware that maps each class to the correct HTTP status code and response body. Controllers and services just throw; the middleware catches and formats every error the same way, and logs anything unexpected with Winston."
  - question: "Does api-forge support different databases?"
    answer: "Yes. During setup you choose your database, and the skill generates Model files with the matching client (Prisma, Mongoose, pg, Drizzle and others) configured and ready. The Controller and Service layers are database-agnostic by design, so changing the data layer later does not touch business logic."
---

api-forge is a free, open source Claude Code skill that scaffolds a production-ready Express + TypeScript API from a single `/backend` command. It sets up a 3-layer architecture (Controller, Service, Model) with Zod validation, Winston logging, named error classes and a consistent response format, then keeps every new resource you add on the same pattern. This guide covers what api-forge is, how to install it and a full walkthrough from empty folder to running API.

## What Is api-forge?

api-forge is a skill collection hosted at [github.com/PadaliyaSavan88/api-forge](https://github.com/PadaliyaSavan88/api-forge). It currently ships one skill:

**`/backend`**: Express + TypeScript backend scaffolding in a 3-layer architecture.

More skills are planned: `/frontend`, `/devops` and `/database`. `/backend` is the core, and it is what this guide covers. If you want to know how a skill like this is put together, I wrote up the process in [Building a Claude Code Skill](/blogs/building-a-claude-code-skill).

## Why Not Just Copy Your Last Project?

Every backend project starts the same way: create the folder, set up TypeScript, wire up Express, write the error handler, add a logger, structure the routes, set up validation, write a response helper. Then do it again for the next project.

Copy-pasting from a previous project is not just slow. Each copy drifts. The error handler is slightly different, the response format does not match, validation lives in the controller on one project and in the service on the next. Six months in, you have six projects with six subtly different conventions. That drift is how [technical debt](/blogs/what-technical-debt-costs-your-business) starts before the first feature ships.

Generators help, but they produce static output. Once you run a generator or clone a boilerplate, it is done. When you need a new resource, such as a `/users` endpoint with full CRUD, you are back to writing it by hand.

### Why a Claude Code skill instead of a generator?

A skill runs inside your AI assistant, so it is conversational and context-aware. When you extend a project, the skill reads your existing code, sees your models, naming conventions, import style and the optional features you chose, and generates a new resource that matches. A static generator produces the same output regardless of what is already there.

You can also ask it questions mid-build: which database to choose, or why validation belongs in the service layer. It is a guided build, not a one-shot template.

## How Do You Install api-forge?

Install the whole collection:

```bash
npx skills add PadaliyaSavan88/api-forge
```

Or only the backend skill:

```bash
npx skills add PadaliyaSavan88/api-forge --skill backend
```

On Linux or Mac you can also use the shell script:

```bash
curl -fsSL https://raw.githubusercontent.com/PadaliyaSavan88/api-forge/main/install.sh | bash -s backend
```

Skills install to `~/.claude/commands/`. Restart Claude Code and `/backend` is available in any project.

**Prerequisites:** Node.js 18+ and [Claude Code](https://claude.ai/code).

## What Does `/backend` Do?

Open Claude Code in a new or existing Node.js project and type `/backend`. The skill runs in one of three modes:

1. **New project:** asks 13 setup questions, then scaffolds the complete project.
2. **Align existing project:** reads your codebase, finds where it diverges from the architecture pattern and brings it into line. Useful for an Express project that grew organically.
3. **Extend current project:** adds a new resource (a full CRUD endpoint group) that matches the existing architecture exactly.

## Walkthrough: From Empty Folder to Running API

### Step 1: Start the skill

```bash
mkdir my-api && cd my-api
claude
```

Type `/backend`, then choose **1** for a new project:

```text
1. New project — scaffold from scratch
2. Align existing project — bring an existing codebase to the pattern
3. Extend current project — add a new resource
```

### Step 2: Answer the setup questions

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

You do not have to answer perfectly. The skill explains each option if you ask, and you can change config values after generation.

### Step 3: Review the generated structure

```text
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

The split between `app.ts` and `server.ts` is intentional: it makes the app testable without binding a port.

### Step 4: Understand the key patterns

**Config with startup validation.** `src/config/index.ts` reads and validates every environment variable at startup:

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

If `DATABASE_URL` is missing or malformed, the app exits at startup with a clear message, not when the first query fires at 3am.

**Named error classes.** Instead of scattered `res.status(404).json(...)` calls:

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

One central middleware maps them to responses:

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

**The 3-layer pattern in action.** A typical resource across the three layers:

```typescript
// Controller: HTTP only
export class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response) {
    const user = await this.userService.getUserById(req.params.id);
    res.json(success(user));
  }
}

// Service: business logic + validation
export class UserService {
  async getUserById(id: string) {
    if (!id) throw new ValidationError('User ID is required');

    const user = await UserModel.findById(id);
    if (!user) throw new NotFoundError('User not found');

    return user;
  }
}

// Model: queries only
export const UserModel = {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
};
```

Controllers know about HTTP, services know about the domain, models know about the database. Because of that separation you can test business logic without an HTTP server, swap the data layer without touching services, and add new entry points (a CLI script, a queue worker) that reuse the same services. For the reasoning behind this structure in more depth, see [Node.js + TypeScript REST API in production](/blogs/nodejs-typescript-rest-api-production).

### Step 5: Add a resource with extend mode

Run `/backend` again and choose **3 (Extend current project)**. Describe the resource:

```text
Add a Posts resource. A post has a title (string, required), body (string, required),
authorId (UUID, required), and publishedAt (nullable datetime). Include full CRUD:
list with pagination, get by ID, create, update, delete.
```

The skill reads your project (Prisma schema, error classes, response helper) and generates:

- `src/controllers/post.controller.ts`
- `src/services/post.service.ts`
- `src/models/post.model.ts`
- `src/routes/post.routes.ts`
- The Prisma model added to `schema.prisma`
- Zod schemas for the create and update payloads

All of it matches your project's style: same imports, same response helper, same error classes, same pagination.

### Step 6: Run the API

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

## What Do You Get Without Writing It Yourself?

- **Consistent responses:** every endpoint returns `{ success, data, message }`
- **Named error classes** mapped to HTTP status codes by one middleware
- **Winston logging:** structured logs, no `console.log` in production code
- **Config validation** that fails fast at startup
- **Pagination** with `page` and `limit` on every list endpoint
- **Graceful shutdown:** SIGTERM handling so deploys do not drop in-flight requests
- **Helmet security headers** on every response
- **Health check endpoint** ready for load balancer probes

Optional at setup: ESLint and Prettier, Husky pre-commit hooks, rate limiting, Swagger/OpenAPI docs, PM2 config, Docker and an HTTPS strategy.

The goal is to close the gap between "new project" and "project following good patterns". That gap is where bad habits form.

The source is at [github.com/PadaliyaSavan88/api-forge](https://github.com/PadaliyaSavan88/api-forge). Issues, feedback and PRs are welcome.

## Frequently Asked Questions

**What is api-forge?**
api-forge is a free, open source collection of Claude Code skills for scaffolding production-grade backend APIs. Its `/backend` skill sets up or extends an Express + TypeScript API using a 3-layer architecture with Zod validation, Winston logging, named error classes and a consistent response format, all enforced from the first commit.

**How do I install api-forge?**
Run `npx skills add PadaliyaSavan88/api-forge` in your terminal. Skills install to `~/.claude/commands/`. Restart Claude Code and `/backend` is available in any project.

**Does api-forge work on existing projects?**
Yes. The `/backend` skill can scaffold a new project, align an existing project to the pattern, or extend a current project with a new resource. In extend mode it reads your codebase and generates a Controller, Service and Model that match your existing conventions.

**Where does Zod validation go in the api-forge architecture?**
In the Service layer. Controllers handle HTTP only and pass data to a service, which validates with Zod and throws a `ValidationError` if the input is invalid. That keeps validation reusable from non-HTTP entry points such as queue workers or scripts.

**How does api-forge handle errors consistently across the API?**
Named error classes (`ValidationError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`) and one centralized error middleware that maps each class to the correct HTTP status code. Controllers and services just throw; the middleware formats every error the same way.

**Does api-forge support different databases?**
Yes. During setup you choose your database, and the skill generates Model files with the matching client (Prisma, Mongoose, pg, Drizzle) configured. The Controller and Service layers are database-agnostic by design.
