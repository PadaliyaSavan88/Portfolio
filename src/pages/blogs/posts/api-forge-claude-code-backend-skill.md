---
title: 'Stop Scaffolding by Hand: Meet api-forge for Claude Code'
date: '2026-06-03'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'api-forge is a Claude Code skill that scaffolds production-grade Express + TypeScript APIs in minutes. One command. No boilerplate. No forgotten patterns.'
dateModified: '2026-06-03'
keyword: 'api-forge, Claude Code skill, Express TypeScript scaffold, backend boilerplate, Claude Code backend, nodejs api generator, express api scaffold, claude code commands'
topic: 'Web Development'
faq:
  - question: "What is api-forge?"
    answer: "api-forge is a collection of Claude Code skills for scaffolding production-grade backend APIs. The /backend skill sets up or extends an Express + TypeScript API using a 3-layer architecture (Controller → Service → Model) with Zod validation, Winston logging, named error classes, and consistent response formatting — all enforced from the start."
  - question: "How do I install api-forge?"
    answer: "Run `npx skills add PadaliyaSavan88/api-forge` in your terminal. Skills install to ~/.claude/commands/. Restart Claude Code after installation and the /backend command will be available in any project."
  - question: "Does api-forge work on existing projects?"
    answer: "Yes. The /backend skill has three modes: scaffold a new project, align an existing project to the pattern, or extend a current project with new resources (routes, controllers, services, models). You choose the mode at the start of each session."
  - question: "What architecture does the /backend skill enforce?"
    answer: "Controller (HTTP layer) → Service (business logic) → DB Model (query only). Controllers never contain business logic. Services never handle HTTP. Models never contain business logic. This separation keeps code testable and maintainable as the project grows."
  - question: "What validation library does api-forge use?"
    answer: "Zod. All request payloads are validated with Zod schemas in the service layer, not the controller. This keeps validation logic co-located with business logic and makes schemas reusable across different entry points (HTTP, queue workers, CLI scripts)."
  - question: "Is api-forge free to use?"
    answer: "Yes. api-forge is open source on GitHub at github.com/PadaliyaSavan88/api-forge. Install it with npx or the manual shell script and use it in any project, commercial or personal."
---

Every backend project starts the same way. Create the folder. Set up TypeScript. Wire up Express. Write the error handler. Add a logger. Structure your routes. Set up Zod validation. Create the response format helper. Then do it again for the next project.

After doing this enough times, I built [api-forge](https://github.com/PadaliyaSavan88/api-forge) — a Claude Code skill that handles all of it in a single command.

## The Problem With Backend Boilerplate

The issue with copy-pasting from a previous project is not that it is slow. It is that each copy drifts. The error handler is slightly different. The response format does not match. The validation is in the controller on this project and in the service on the next one. Six months in, you have six projects with six subtly different conventions, and onboarding anyone means explaining which version of "the pattern" this particular repo follows.

Generators help, but they produce static output. Once you run `create-express-app` or clone your boilerplate, the generator is done. If you need a new resource — a new `/users` endpoint with full CRUD — you are back to writing it by hand or copying from somewhere else in the project and hoping it stays consistent.

api-forge takes a different approach. It is a Claude Code skill, which means it runs inside your AI assistant. It does not generate a fixed folder structure and step aside — it understands your project, applies patterns, and extends your codebase as it grows. Every resource it adds follows the same architecture as the last one.

## What api-forge Is

api-forge is a skill collection hosted at [github.com/PadaliyaSavan88/api-forge](https://github.com/PadaliyaSavan88/api-forge). Currently it ships one skill:

**`/backend`** — Express + TypeScript backend scaffolding in a 3-layer architecture.

More skills are planned: `/frontend`, `/devops`, `/database`. But `/backend` is the core, and it is what this post covers.

## Installing in 30 Seconds

```bash
npx skills add PadaliyaSavan88/api-forge
```

Or install just the backend skill:

```bash
npx skills add PadaliyaSavan88/api-forge --skill backend
```

On Linux/Mac you can also use the shell script directly:

```bash
curl -fsSL https://raw.githubusercontent.com/PadaliyaSavan88/api-forge/main/install.sh | bash -s backend
```

Skills install to `~/.claude/commands/`. After installation, restart Claude Code and `/backend` will be available in any project.

## What `/backend` Does

Once installed, open Claude Code in a new or existing Node.js project and type `/backend`.

The skill runs in one of three modes depending on what you choose:

**1. New project** — Asks 13 setup questions covering project name, description, port, database choice, authentication strategy, optional features (rate limiting, Swagger, Docker, PM2, health checks), and testing framework. Then scaffolds the complete project.

**2. Align existing project** — Reads your current codebase, identifies where it diverges from the architecture pattern, and brings it into alignment. Useful if you have an Express project that grew organically and want to clean it up.

**3. Extend current project** — Adds a new resource (a full CRUD endpoint group) that matches the existing architecture exactly. No copy-paste, no drift.

## The Architecture it Enforces

Every project built with `/backend` follows the same three-layer pattern:

```
Controller  →  Service  →  Model
(HTTP only)    (logic)     (queries)
```

**Controllers** handle HTTP concerns only: parsing the request, calling a service, returning a response. They contain no business logic.

**Services** contain business logic: validation with Zod, error throwing, orchestration across models. They know nothing about HTTP.

**Models** contain only database queries. No logic, no validation — just the interface to your data layer.

This separation means you can test business logic in services without spinning up an HTTP server, swap your database layer without touching business logic, and add a new entry point (a CLI script, a queue worker) by calling the same services your HTTP routes use.

## What Gets Set Up

Beyond folder structure, `/backend` configures:

- **Response format**: every endpoint returns `{ success, data, message }` — consistent across the entire API
- **Named error classes**: `ValidationError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError` — no more `res.status(404).json({ error: 'not found' })` scattered everywhere
- **Winston logging**: no `console.log` anywhere in the codebase — structured logs from day one
- **Centralized config**: all environment variables read and validated at startup — the app fails fast if something is missing, not at 2am when the first request hits a missing var
- **Pagination**: list endpoints get `page` and `limit` parameters baked in from the start
- **Graceful shutdown**: SIGTERM handling so deploys do not drop in-flight requests
- **Helmet security headers**: because forgetting security headers is the easiest mistake to make

Optional features you can enable during setup: ESLint and Prettier, Husky pre-commit hooks, rate limiting, health check endpoint, Swagger/OpenAPI docs, PM2 config, Docker setup, and HTTPS strategy.

## Why a Claude Code Skill Instead of a Generator

The key difference is that a skill is conversational and context-aware. When you run `/backend --extend`, the skill reads your existing code, sees that you already have a `User` model with certain fields, and generates a new resource that is consistent with your existing patterns — including your naming conventions, your import style, and whatever optional features you chose at setup.

A static generator cannot do that. It produces the same output regardless of what is already there.

A skill also lets you ask follow-up questions. If you are not sure which database to choose, you can ask. If you want to understand why Zod validation lives in the service layer rather than the controller, the skill can explain the decision. It is not just code generation — it is a guided build process.

## Getting Started

```bash
# Install api-forge
npx skills add PadaliyaSavan88/api-forge

# Open Claude Code in your project
# Type /backend and follow the prompts
```

For a full walkthrough — including what the generated folder structure looks like, how the error handler is wired, and how to add your first resource — see [Build a Production-Ready Express API with Claude Code's /backend Skill](/blogs/build-express-api-with-api-forge).

The source is at [github.com/PadaliyaSavan88/api-forge](https://github.com/PadaliyaSavan88/api-forge). Issues, feedback, and PRs are open.

## Frequently Asked Questions

**What is api-forge?**
api-forge is a collection of Claude Code skills for scaffolding production-grade backend APIs. The `/backend` skill sets up or extends an Express + TypeScript API using a 3-layer architecture with Zod validation, Winston logging, named error classes, and consistent response formatting — all enforced from the start.

**How do I install api-forge?**
Run `npx skills add PadaliyaSavan88/api-forge` in your terminal. Skills install to `~/.claude/commands/`. Restart Claude Code after installation and `/backend` will be available in any project.

**Does api-forge work on existing projects?**
Yes. The `/backend` skill has three modes: scaffold a new project, align an existing project to the pattern, or extend a current project with new resources. You choose the mode at the start of each session.

**What architecture does the `/backend` skill enforce?**
Controller (HTTP layer) → Service (business logic) → DB Model (query only). Controllers never contain business logic. Services never handle HTTP. Models never contain business logic. This separation keeps code testable and maintainable as the project grows.

**What validation library does api-forge use?**
Zod. All request payloads are validated with Zod schemas in the service layer, not the controller. This keeps validation logic co-located with business logic and makes schemas reusable across different entry points.

**Is api-forge free to use?**
Yes. api-forge is open source on GitHub. Install it with `npx` or the manual shell script and use it in any project, commercial or personal.
