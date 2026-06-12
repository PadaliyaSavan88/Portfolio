---
title: 'How I Built a Claude Code Skill for Backend Development'
date: '2026-06-07'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Behind the scenes of building api-forge: what Claude Code skills are, how the /backend skill prompt is structured, the design decisions behind the 3-layer architecture, and how to build your own skill.'
dateModified: '2026-06-07'
keyword: 'claude code skill, build claude code skill, claude code commands, claude code slash commands, api-forge development, claude code custom commands, how to build claude code skill, claude code prompt engineering'
topic: 'AI Engineering'
faq:
  - question: "What is a Claude Code skill?"
    answer: "A Claude Code skill is a markdown file that defines a slash command — a reusable, invocable instruction set that runs inside Claude Code. When you type /backend in Claude Code, it loads the skill's markdown prompt and executes it in context with your project files. Skills live in ~/.claude/commands/ and can be shared via npm or GitHub."
  - question: "How do you share a Claude Code skill with others?"
    answer: "You can share skills by publishing them to a GitHub repository. Users install via `npx skills add <github-username>/<repo>` or a shell script. The skill files are markdown documents that install to ~/.claude/commands/ on the user's machine. No registry or build step required."
  - question: "What makes a good Claude Code skill prompt?"
    answer: "Good skill prompts are explicit about modes (new vs extend vs align), enumerate every decision upfront, define the exact output format expected, and include architectural rules the model must enforce consistently. Vague prompts produce inconsistent output. Specific prompts with explicit constraints produce reliable, repeatable scaffolding."
  - question: "Why did you choose the Controller → Service → Model architecture for api-forge?"
    answer: "Because it is the minimum structure that keeps HTTP concerns, business logic, and database queries separate — and that separation is what makes code testable and maintainable. More complex patterns like DDD or hexagonal architecture add overhead that most API projects do not need at the start. Three layers is the smallest number that prevents the worst forms of coupling."
  - question: "How do I create my own Claude Code skill?"
    answer: "Create a markdown file at ~/.claude/commands/my-skill.md. The filename becomes the slash command name. Write the skill instructions in the markdown body — describe the task, enumerate modes, define output expectations. Reload Claude Code and type /my-skill to invoke it. To share with others, push the file to a GitHub repo and users can install it with npx skills add."
---

I have been writing Express APIs for long enough that I can scaffold one from memory. I know which packages to install, how to structure the folders, where to put validation, and how to wire up the error handler. I have done it probably 40 times across different projects.

The problem is not that scaffolding is hard. The problem is that I kept doing it slightly differently each time, and those inconsistencies compounded over the life of a project. Validation in the controller here, in the service there. Named error classes in one project, status codes scattered everywhere in another. I decided to encode what I actually know into a Claude Code skill so I would stop re-making the same small decisions under deadline pressure.

That skill is [api-forge](https://github.com/PadaliyaSavan88/api-forge). This post is about how I built it — what Claude Code skills are, how the prompt is structured, and what I would do differently if I were starting again.

## What a Claude Code Skill Actually Is

A Claude Code skill is a markdown file. That is it.

When you install a skill, a `.md` file lands in `~/.claude/commands/`. The filename becomes the slash command. When you type `/backend` in Claude Code, the tool reads that markdown file, injects its contents into the conversation context, and the model executes the instructions in the context of your current project files.

The power comes from what Claude Code gives the model access to: your file system. When the skill prompt says "read the existing controllers and match their naming conventions," the model can actually do that — it reads your source files, understands the patterns, and generates new code that fits.

Skills are not scripts. There is no code execution, no AST parsing, no templating engine. It is natural language instructions and a capable model. The quality of the output depends entirely on the quality of the prompt.

## The Skill File Structure

A skill file looks like this:

```markdown
---
name: backend
description: Express + TypeScript backend — 3-layer architecture, scaffold or extend
---

You are a backend API architect...

## Modes
...

## Architecture rules
...
```

The frontmatter gives the skill its name and a description (shown when the user lists available skills). Everything after the frontmatter is the prompt that runs when the skill is invoked.

## What the `/backend` Prompt Does

The prompt has four main sections:

### 1. Role definition

The prompt opens by defining the model's role precisely:

```
You are a backend API architect helping scaffold and extend 
production-grade Express + TypeScript APIs. You apply opinionated, 
consistent patterns across every project. You do not explain options 
or ask unnecessary questions — you ask the minimum required to make 
decisions, then act.
```

The "do not explain options" instruction is important. Without it, the model tends to present a menu of choices for every decision — "you could use Zod or Joi or Yup..." — which defeats the purpose of an opinionated scaffold. The skill has opinions. It uses Zod. It uses Winston. It enforces the 3-layer pattern. The prompt makes that clear upfront.

### 2. Mode selection

The prompt defines three distinct modes with explicit triggers:

```
Determine which mode to operate in by asking the user one question:
1. New project — user has an empty or near-empty directory
2. Align — user has an existing Express project that needs restructuring
3. Extend — user has an api-forge project and wants to add a resource

After mode selection, do not re-ask. Proceed to the appropriate section.
```

Explicit mode gates prevent the model from blending behaviors. Without them, "extend" sessions sometimes tried to re-scaffold the entire project when a new resource was requested.

### 3. Architecture rules

This is the heart of the prompt — a set of explicit constraints the model must follow:

```
## Architecture — enforce these without exception

Controller layer:
- Handles HTTP only: parse request, call service, return response
- Zero business logic
- Zero database calls
- Catches nothing (let the error middleware handle it)

Service layer:
- Contains all business logic
- Validates with Zod schemas defined in this file
- Throws named error classes, never raw Error objects
- Calls model functions, never Prisma/Mongoose directly

Model layer:
- Database queries only
- Returns data or null/[]
- No validation, no logic, no error throwing
```

The "enforce these without exception" phrasing matters. Without strong language, the model treats architectural rules as suggestions and starts writing business logic in controllers when it seems convenient.

### 4. Output specification

The prompt specifies what the model must generate and in what order:

```
For a new project, generate in this order:
1. package.json with exact dependencies
2. tsconfig.json
3. src/config/index.ts with Zod env validation
4. src/errors/index.ts with all error classes
5. src/utils/logger.ts with Winston config
6. src/utils/response.ts with success() helper
7. src/middleware/error.middleware.ts
8. src/app.ts
9. server.ts with graceful shutdown
10. .env.example
```

Ordering matters. If the model generates `app.ts` before `errors/index.ts`, it has to either import from a file that does not exist yet or make assumptions about the error class shape. Explicit ordering prevents those gaps.

## Design Decisions I Would Make Again

**Zod in the service layer, not the controller.** The first version of the skill put Zod schemas at the controller level as dedicated validation middleware. This looked clean but created a problem: if you wanted to call the same service from a queue worker or a CLI script, you had to re-validate or call the HTTP middleware from a non-HTTP context. Moving validation into services made them self-contained units that could be called from anywhere safely.

**Named error classes instead of status codes.** Controllers that throw `new NotFoundError()` are more readable than controllers that throw `new Error('Not found', { cause: { statusCode: 404 } })`, and far more readable than controllers that call `res.status(404)` directly. The error class names document the intent at the throw site and let the central middleware make formatting decisions without duplicating logic.

**Winston over console.log from day one.** It is tempting to start with `console.log` and "add proper logging later." That later never comes. Wiring Winston at scaffold time means structured logs, log levels, and transport configuration are in place before the first feature ships.

**Startup config validation.** Reading environment variables lazily (checking for `process.env.DATABASE_URL` inside a function that gets called on the first request) means a misconfigured deployment runs until someone makes a database call. Validating the entire config object at startup and exiting immediately on failure means the problem surfaces at deploy time, not at 2am when a user triggers an edge case.

## Design Decisions I Would Change

**The 13-question setup is too many.** I got feedback that answering 13 questions before seeing any output feels like a form. A better flow would be to ask 4-5 essential questions (name, database, auth), scaffold a minimal project, and let the user add optional features with follow-up commands. I will refactor this in the next version.

**No migration path between modes.** If you scaffold a project and then change your database from PostgreSQL to MongoDB, there is no "re-align the model layer" command. You have to run extend mode and manually clean up. A dedicated `/backend migrate-db` mode would cover this.

**Insufficient handling of monorepo layouts.** The skill assumes a single-service layout. If your project is a monorepo with multiple services, the skill generates everything in the root directory. I added a check for this late in development, but it is still fragile.

## How to Build Your Own Skill

If you want to build a Claude Code skill for your own recurring workflows, here is the short version:

**1. Create the skill file:**

```bash
mkdir -p ~/.claude/commands
touch ~/.claude/commands/my-skill.md
```

**2. Write the prompt:**

Start with a role definition, then enumerate your modes, then state your constraints explicitly. Be specific about output format and ordering. Use strong language for rules you want enforced without exception.

**3. Test with real projects:**

Open Claude Code in a realistic project directory and invoke the skill. The first version will produce output that is 80% right and 20% wrong in predictable ways. Fix the wrong parts by adding explicit instructions to the prompt.

**4. Share via GitHub:**

Push your skill file (and a simple install script) to a GitHub repo. Users can install with:

```bash
npx skills add your-username/your-repo
```

The most important thing about skill prompting is specificity. Vague instructions ("generate a well-structured API") produce inconsistent output. Explicit instructions ("generate the files in this order, use these exact imports, throw these specific error classes") produce reliable, repeatable output you can depend on.

## The Skill Is Open Source

The full skill prompt for `/backend` is in the [api-forge repository](https://github.com/PadaliyaSavan88/api-forge). Reading the actual prompt is more useful than any description of it — you can see exactly what instructions produce the output described in the other posts.

If you want to install it: `npx skills add PadaliyaSavan88/api-forge`

If you find something it generates wrong, open an issue. The prompt is the code — a bug report is usually a missing or ambiguous instruction, and the fix is a one-line addition.

## Frequently Asked Questions

**What is a Claude Code skill?**
A Claude Code skill is a markdown file that defines a slash command — a reusable instruction set that runs inside Claude Code. When you type `/backend`, it loads the skill's markdown prompt and executes it in context with your project files. Skills live in `~/.claude/commands/` and can be shared via GitHub.

**How do you share a Claude Code skill with others?**
Publish the skill files to a GitHub repository. Users install via `npx skills add <github-username>/<repo>`. The skill files are plain markdown documents that install to `~/.claude/commands/` on the user's machine. No registry or build step required.

**What makes a good Claude Code skill prompt?**
Explicit modes, upfront enumeration of every decision, defined output format and ordering, and architectural rules stated as hard constraints rather than suggestions. Vague prompts produce inconsistent output. Specific prompts with explicit constraints produce reliable, repeatable scaffolding.

**Why did you choose the Controller → Service → Model architecture?**
It is the minimum structure that keeps HTTP concerns, business logic, and database queries separate. That separation is what makes code testable and maintainable. More complex patterns add overhead that most API projects do not need at the start. Three layers is the smallest number that prevents the worst forms of coupling.

**How do I create my own Claude Code skill?**
Create a markdown file at `~/.claude/commands/my-skill.md`. The filename becomes the slash command. Write the skill instructions in the markdown body — define the role, enumerate modes, specify output format. Reload Claude Code and type `/my-skill`. To share, push to GitHub and users install with `npx skills add`.
