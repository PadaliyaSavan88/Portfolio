---
title: 'Developers Are Great at HOW. But What About WHY and WHAT?'
date: '2026-04-16'
image: 'images/developers-why-what-design-sprint.jpg'
imageName: 'developers-why-what-design-sprint.jpg'
author: 'Savan Padaliya'
description: 'Most developers are experts at HOW to build — but WHY and WHAT to build are where real product thinking lives. A Design Sprint changed how I see this gap.'
keyword: 'design sprint, product thinking for developers, why what how framework, developer soft skills, google ventures design sprint, product engineering, developer product mindset'
---
## I Knew How to Build. I Just Didn't Know What — or Why.

If you ask a developer how to build a rate limiter, they'll give you a token bucket algorithm, Redis implementation, and edge case handling in under five minutes.

Ask them *why* the product needs a rate limiter — or *what* problem it actually solves — and the room goes quiet.

That was me. Until a Design Sprint changed my perspective.

---

## What Is a Design Sprint?

A Design Sprint is a 5-day framework developed by Google Ventures to validate ideas and prototype solutions before writing a single line of production code.

The structure looks like this:

| Day | Focus |
|-----|-------|
| Day 1 | Understand — map the problem space |
| Day 2 | Sketch — individual solution ideation |
| Day 3 | Decide — vote and commit to one direction |
| Day 4 | Prototype — build a realistic facade |
| Day 5 | Test — validate with real users |

Every team is in the room: product, design, engineering, business, and sometimes stakeholders or customers.

The goal isn't to ship. It's to *learn fast* — validate the right problem before you invest months building the wrong solution.

---

## The HOW Trap

Developers are trained to optimize for HOW.

- HOW do we store this data efficiently?
- HOW do we scale this service?
- HOW do we reduce latency?

These are important questions. But they're downstream questions — they only matter after you've answered the upstream ones.

**WHAT are we actually building?**
**WHY does it need to exist?**

In most engineering workflows, those answers are handed to developers pre-packaged as tickets, PRDs, or specs. We rarely sit in the room where those decisions are made.

The Design Sprint put me in that room.

---

## What Business Teams Are Actually Solving

On Day 1 of the sprint, the business and product folks mapped the entire problem space. They asked questions I'd never thought to ask:

- Who is the user, and what are they actually trying to accomplish?
- What's the biggest risk to this idea working?
- Where in the journey are users most likely to drop off or fail?
- What does success look like — not technically, but for the business?

There was no code discussed. No architecture. No stack debates.

And it was some of the most valuable problem-solving I'd witnessed.

---

## The WHAT Problem

Defining WHAT to build is harder than it sounds.

During the sprint, we had over a dozen possible directions for a single feature. Each one solved a slightly different version of the problem. Without a structured process, a team could easily build the wrong thing — with perfect execution.

The Design Sprint forces you to choose one direction and stress-test it before building it. That's not a product skill or a business skill. That's just good engineering judgment — applied at the right stage.

Most developers never get exposure to this stage. We inherit the WHAT from upstream decisions.

---

## The WHY Problem

WHY is even harder.

WHY ties the product to a user's real need and the business's reason for existing. It's the difference between:

- "We need authentication" → WHY? To protect user data? To enable personalization? To drive account creation for monetization?

Each WHY leads to a different WHAT, which leads to a different HOW.

When developers don't understand WHY, they make local technical decisions that are globally wrong. They optimize for the wrong constraint. They build the right feature for the wrong reason.

---

## What I Took Away

The sprint taught me three things I'm now applying to every project:

**1. Start with the problem, not the solution.**
Before writing code, write down the problem in one sentence. If you can't, you don't understand it yet.

**2. Separate discovery from delivery.**
Design Sprint thinking belongs before the sprint planning board. Mixing them creates the illusion of progress while solving the wrong problem.

**3. Engineers belong in the room earlier.**
When developers understand WHY and WHAT, they make better HOW decisions. Architectural choices, database schemas, API contracts — these all improve when the engineer understands the problem at the product level.

---

## The Bigger Picture

The best engineers I've worked with don't just know their stack. They understand the product deeply enough to push back on requirements, ask the right upstream questions, and flag technical decisions that would create business problems six months later.

That's not a "soft skill." That's senior engineering.

The HOW will always matter. But in a world where [AI can generate HOW faster than ever](/blogs/openai-vs-vertex-ai-for-production-saas), the engineers who understand WHY and WHAT will be the ones who matter most.

---

## FAQ

**What is a Design Sprint?**
A Design Sprint is a 5-day structured process created by Google Ventures to validate product ideas through rapid prototyping and user testing — before committing engineering resources.

**Why should developers care about WHY and WHAT?**
When developers only solve HOW, they risk building the right solution to the wrong problem. Understanding WHY and WHAT leads to better architectural decisions, faster pivots, and more impactful work.

**How can a developer learn product thinking?**
Participate in design sprints, shadow product and business team discussions, read *Sprint* by Jake Knapp, and ask WHY more often when reviewing requirements.

**Is product thinking a soft skill?**
No. It's a core engineering skill at the senior level. It directly influences technical architecture, prioritization, and system design decisions.

**Want to see product-level thinking applied to a real technical decision?**
[OpenAI vs Vertex AI for Production SaaS](/blogs/openai-vs-vertex-ai-for-production-saas) walks through exactly that kind of WHY-first reasoning — not just comparing features, but thinking through what the right choice is for a specific business context. For a hands-on example of [building a RAG pipeline](/blogs/rag-architecture-for-javascript-developers), the architecture decisions there reflect the same upstream thinking this post describes.
