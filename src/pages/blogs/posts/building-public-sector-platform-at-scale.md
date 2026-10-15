---
title: 'Lessons from Building for 69.9M Users'
date: '2026-10-09'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'What working on a national public sector platform serving 69.9 million citizens taught me about reliability, traffic spikes, data trust and boring tech.'
keyword: 'scalable web application, high traffic system design, production reliability, public sector software, building at scale, web application reliability, government platform engineering, senior full stack developer'
topic: 'Web Development'
faq:
  - question: "What is the biggest difference when building for tens of millions of users?"
    answer: "Rare problems stop being rare. A bug that affects one request in a million happens many times a day, a slow query that is fine in testing becomes an outage under load, and any downtime is noticed immediately by the public. You move from asking 'does it work?' to asking 'what happens when it fails, and how fast will we know?'"
  - question: "How do you handle traffic spikes on a public platform?"
    answer: "Assume they will happen, because public services spike around news events, deadlines and announcements. Cache read-heavy data aggressively, keep the hot path as short as possible, scale stateless services horizontally, put rate limits in front of expensive operations, and decide in advance which non-essential features can be switched off to protect the core flow."
  - question: "Why does data validation matter so much at scale?"
    answer: "When millions of people make real decisions based on data in your system, wrong data costs trust faster than downtime. Every input from external sources needs validation at the edge, sanity checks against expected ranges, clear audit trails of who changed what and when, and a way to correct mistakes quickly."
  - question: "Do you need complex architecture to serve millions of users?"
    answer: "Usually not. Most large, reliable systems run on well-understood tools: a relational database with good indexes, caching, a load balancer, horizontally scaled stateless services and solid monitoring. Complexity should be added only when a measured bottleneck demands it. Simple systems are easier to reason about during an incident."
  - question: "What should a startup take from public sector engineering?"
    answer: "Three habits transfer directly: design the failure path before the happy path, invest in monitoring before you need it, and validate every piece of data that comes from outside your system. You do not need national scale to benefit from them, and they are far cheaper to build in early than to add after the first serious incident."
---

Building a platform that serves **69.9 million citizens** taught me that reliability at scale is less about clever architecture and more about discipline: designing for failure first, treating data accuracy as seriously as uptime, caching what is read most, monitoring before you need it and choosing boring, well-understood technology. These lessons apply to any scalable web application, not only government systems.

Since 2024 I have worked as a senior full stack developer on a national public sector fuel pricing platform. Fuel stations submit their prices, and citizens use the platform to find the cheapest fuel near them. I will keep client details general, but the engineering lessons are worth sharing, especially for founders whose products are starting to grow.

## What Changes When Your Users Are a Whole Country?

The most important change is that **rare events stop being rare**.

At a few thousand users, a bug that triggers once in a million requests may never show up. At national scale, it happens many times a day. A query that takes 200 milliseconds in testing can become a bottleneck when thousands of people run it at the same moment. An edge case in how one browser handles a form becomes a support issue for thousands of real people.

The second change is **visibility**. A public platform has no quiet hours where an outage goes unnoticed. When something breaks, citizens notice, and sometimes the press does too.

Together, these shift the core question from "does it work?" to **"what happens when it fails, and how quickly will we know?"**

## Lesson 1: Design the Failure Path Before the Happy Path

Every external dependency will eventually be slow or unavailable: a third-party API, a map service, an email provider, even your own database during maintenance. At scale, "eventually" means "this month."

For every feature, I now ask these questions before writing code:

1. **What happens if this dependency is down?** Does the whole page fail, or just one widget?
2. **What does the user see?** A helpful message and cached data, or a blank screen?
3. **What gets retried, and how?** Retries with backoff and limits, so a struggling service is not flooded with even more requests.
4. **What can be switched off?** Non-essential features should be removable during an incident to protect the core flow.

For a fuel price platform, the core flow is simple: show accurate, recent prices near me. Everything else is secondary, and the system should protect that one flow above all.

## Lesson 2: Traffic Spikes Are Predictable, So Plan for Them

Public platforms do not get smooth, steady traffic. Usage jumps around events people care about. For fuel prices, that means news of price changes, holidays and periods of uncertainty, exactly when people most want to check before filling up.

The good news is that spikes are mostly predictable in *shape*, even if not in exact timing. The approach that works:

- **Cache read-heavy data aggressively.** Most traffic reads the same data: prices in a given area. Serving that from a cache instead of the database removes most of the load.
- **Keep the hot path short.** The request that happens millions of times should do as little work as possible. Heavy processing belongs in background jobs.
- **Scale stateless services horizontally.** If application servers hold no session state, you can add more behind a load balancer when traffic rises.
- **Rate-limit expensive operations**, so one misbehaving client or bot cannot degrade the experience for everyone else.

If you want the full picture of what each request goes through, from DNS to load balancer to database, I covered it in [what actually happens when you hit enter after typing a URL](/blogs/what-happens-when-you-type-a-url). Every layer in that chain is a place where scale either holds or breaks.

## Lesson 3: Wrong Data Costs More Trust Than Downtime

This was the lesson that surprised me most. On a platform where people make real decisions based on the data, **a wrong number is worse than a slow page**. A citizen who drives across town for a price that was entered incorrectly does not come back.

When data comes from many external sources, in this case thousands of fuel stations, data quality has to be engineered, not hoped for:

- **Validate at the edge.** Check types, formats and required fields the moment data enters the system.
- **Sanity-check against expected ranges.** A price wildly outside the normal range is more likely a typo than a real change. Flag it instead of publishing it blindly.
- **Keep an audit trail.** Record who submitted what, and when. When a mistake happens, you need to trace and fix it quickly.
- **Show freshness.** Telling users when data was last updated builds trust and sets expectations.

The same principle applies to any startup that displays third-party or user-submitted data: prices, inventory, reviews, availability. Trust is your product.

## Lesson 4: Monitoring Is a Feature, Not an Afterthought

At scale, you cannot wait for users to report problems. By the time they do, thousands of people have already hit the issue.

Good monitoring answers four questions at a glance:

1. **Is the system up?** Health checks on every critical service.
2. **Is it fast?** Response times at the 95th and 99th percentile, not just the average. Averages hide the slow requests that real users feel.
3. **Is it correct?** Error rates, failed jobs and data validation failures.
4. **Is anything unusual?** Sudden changes in traffic, error patterns or submission volume.

Alerts should go to a person who can act, and they should be rare enough that nobody learns to ignore them. I wrote about applying the same approach to AI systems in [how to monitor AI pipelines in production](/blogs/how-to-monitor-ai-pipelines-in-production); the principles are the same whether the component is an LLM call or a database query.

## Lesson 5: Boring Technology Wins

There is a myth that serving millions of users requires exotic architecture. In practice, most large and reliable systems run on well-understood building blocks:

| Building block | Why it holds up at scale |
|---|---|
| Relational database with proper indexes | Predictable, well-understood performance and strong consistency |
| Caching layer | Removes most read load from the database |
| Load balancer + stateless app servers | Add capacity by adding servers |
| Background job queue | Keeps slow work off the user's request path |
| Centralized logging and metrics | Makes incidents debuggable |

Complexity should be added only when a **measured** bottleneck demands it. During an incident at 2am, a simple system you fully understand beats a sophisticated one you only partly understand. This is also why I tell founders they rarely need microservices or Kubernetes for their first version, a point I made in [how to choose a tech stack for your MVP](/blogs/choose-tech-stack-startup-mvp).

## Lesson 6: Public Sector Software Has Extra Constraints

Government and public sector platforms come with constraints most startups do not face:

- **Accessibility is mandatory**, not a nice-to-have. The platform must work for every citizen, including people using screen readers, older devices and slow connections.
- **Security and data protection standards are strict**, with reviews and audits built into the process.
- **Change is slower and more deliberate.** Releases go through approvals, so getting things right before release matters more than shipping fast and fixing later.

These constraints are frustrating at first. Over time, I came to see them as a forcing function for quality, and many of them are habits startups would benefit from adopting voluntarily.

## What Should Startups Take From This?

You do not need 69.9 million users to benefit from these lessons. Three habits transfer directly to any growing product:

1. **Design the failure path first.** Decide what users see when each dependency fails, before you build the feature.
2. **Invest in monitoring before you need it.** It costs little early and is extremely expensive to lack during your first serious incident.
3. **Validate every piece of data that comes from outside your system.** Users, partners and integrations will all send you surprises.

If your product is growing and you are not sure it will hold, a [startup architecture review](/blogs/startup-architecture-review-what-to-expect) is a quick way to find the weak points before your users do. For the design patterns that come next as a SaaS grows, see [system design for AI-powered SaaS](/blogs/system-design-ai-powered-saas), and for a solid backend foundation, [building a production Node.js and TypeScript REST API](/blogs/nodejs-typescript-rest-api-production).

If you want a second pair of eyes on whether your system is ready for the next stage of growth, [book a call](/how-i-help/scale-your-saas). I am happy to share what I have learned building at this scale.

## Frequently Asked Questions

**What is the biggest difference when building for tens of millions of users?**  
Rare problems stop being rare. A one-in-a-million bug happens many times a day, a query that is fine in testing becomes a bottleneck under load, and downtime is noticed immediately. The question shifts from "does it work?" to "what happens when it fails, and how fast will we know?"

**How do you handle traffic spikes on a public platform?**  
Assume they will happen. Cache read-heavy data aggressively, keep the hot path short, scale stateless services horizontally, rate-limit expensive operations, and decide in advance which non-essential features can be switched off to protect the core flow.

**Why does data validation matter so much at scale?**  
When millions of people make real decisions based on your data, wrong data costs trust faster than downtime. Validate inputs at the edge, sanity-check against expected ranges, keep audit trails and make corrections fast.

**Do you need complex architecture to serve millions of users?**  
Usually not. Most reliable large systems use well-understood tools: a relational database with good indexes, caching, load balancing, stateless services and solid monitoring. Add complexity only when a measured bottleneck demands it.

**What should a startup take from public sector engineering?**  
Design the failure path before the happy path, invest in monitoring before you need it, and validate every piece of external data. These habits are far cheaper to build early than to add after the first serious incident.
