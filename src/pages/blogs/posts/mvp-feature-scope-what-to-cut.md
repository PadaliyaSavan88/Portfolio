---
title: 'MVP Scope: What to Cut and What to Keep'
date: '2026-10-14'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'How to decide MVP scope: a simple test for every feature, what founders should cut, the few things you should never cut, and a worked example.'
keyword: 'MVP scope, MVP features, minimum viable product scope, feature prioritization startup, what to include in an MVP, MVP feature list, cut MVP features, MVP development'
topic: 'Startups'
faq:
  - question: "How do I decide which features go into my MVP?"
    answer: "Write down the single riskiest assumption your business depends on, usually whether a specific user will do a specific thing. Then test every feature against one question: does it help prove or disprove that assumption? If yes, it stays. If the MVP still works for that test without it, it gets cut or faked. Everything else goes on a later list."
  - question: "What features should you cut from an MVP?"
    answer: "Usually admin dashboards, complex user roles and permissions, payments and subscriptions when you can invoice manually, settings pages, notifications beyond the essentials, multiple languages, native mobile apps when a responsive web app works, advanced analytics, and integrations nobody has asked for. Cut anything that serves a future user rather than the first ten."
  - question: "What should never be cut from an MVP?"
    answer: "The core action that tests your assumption, basic security such as proper authentication and password hashing, protection of user data, a way to learn from users through analytics or direct feedback, and enough reliability and polish that users judge the idea, not the bugs. Cutting these does not save time; it makes the test invalid."
  - question: "How many features should an MVP have?"
    answer: "There is no fixed number, but most good MVPs have one core flow that users complete from start to finish, plus the minimum around it to make that flow usable. If you cannot describe the MVP in one sentence starting with 'A user can...', the scope is probably too large."
  - question: "Can I fake features in an MVP?"
    answer: "Yes, and you often should. Manual work behind the scenes, sometimes called a concierge or Wizard of Oz MVP, lets you test whether users want an outcome before building the automation. Sending invoices by hand, matching users manually or reviewing AI output yourself are all valid ways to learn faster and spend less."
---

**To decide MVP scope, identify the one assumption your business most depends on, then keep only the features needed to test it.** Everything else, including admin panels, payments you can handle manually, settings and extra user roles, gets cut or faked. A few things are never cut: the core action, basic security, user data protection, a way to learn from users and enough polish that people judge the idea rather than the bugs.

This guide gives founders a simple test to run on every feature, a list of what to cut and what to keep, and a worked example from a real MVP. It draws on my years as a product owner on a white-label food delivery SaaS and on MVPs I have built for startups since.

## Why Is MVP Scope the Most Important Decision?

Scope decides almost everything else about your MVP development: how long it takes, what it costs and whether you learn anything useful at the end.

An MVP is not a small version of your final product. It is **an experiment** designed to answer a question as cheaply and quickly as possible. Every extra feature makes the experiment slower, more expensive and harder to read. If an MVP with fifteen features fails, you do not know which part failed.

Scope is also the biggest cost lever you control. As I covered in [how much MVP development costs](/blogs/mvp-development-cost-startup-founders), the difference between a 4-week and a 12-week build is almost never the technology. It is the feature list.

## What Is the One Question Your MVP Must Answer?

Before listing any features, write down your **riskiest assumption**. It usually looks like this:

> "[A specific type of user] will [do a specific thing] because [reason]."

Examples:

- "Independent teachers will upload full courses to a new platform because it reaches learners they cannot reach alone."
- "Small restaurants will take orders through their own branded app instead of a marketplace because the commission is lower."
- "HR managers will trust AI-drafted job descriptions enough to publish them with only light edits."

If this assumption is wrong, nothing else about the business matters. The MVP exists to test it. This is the WHY that should come before the WHAT and the HOW, which I wrote about in [Developers Are Great at HOW. But What About WHY and WHAT?](/blogs/developers-missing-why-and-what)

## How Do You Decide Whether a Feature Stays?

Run every feature through these four questions, in order:

1. **Does it directly help test the riskiest assumption?** If yes, keep it.
2. **Can the core flow work without it?** If yes, cut it.
3. **Can it be done manually for the first users?** If yes, fake it with a human behind the scenes.
4. **Will its absence make users distrust the product or invalidate the test?** If yes, keep a minimal version.

Anything that does not survive goes on a "later" list. Writing it down matters; founders cut features far more easily when they know the idea is parked, not lost.

## What Should You Cut From an MVP?

These features show up on almost every first-draft MVP spec, and almost all of them can wait:

| Feature | Why you can cut it | What to do instead |
|---|---|---|
| Admin dashboard | You are the only admin | Edit the database directly or use a simple admin tool |
| Payments and subscriptions | Early customers can be invoiced manually | Payment links or invoices by email |
| Complex roles and permissions | You have a handful of users | One or two roles, hard-coded |
| Settings and preferences | Defaults work for early users | Pick sensible defaults |
| Native mobile apps | A responsive web app reaches the same users | Mobile-friendly web app first |
| Email and push notification system | Low volume | A few transactional emails only |
| Multiple languages | You are testing one market | Launch in one language |
| Advanced analytics dashboards | You need answers, not charts | Basic event tracking and talking to users |
| Integrations nobody asked for | Speculative | Add when a paying user requests one |

The pattern: **cut anything that serves your hundredth or thousandth user rather than your first ten.**

During my product owner years on a food delivery SaaS used by multiple businesses, the most useful habit I built was asking "who exactly needs this, and do they exist yet?" for every request on the roadmap. Many features that felt essential in planning meetings had no real user waiting for them.

## What Should You Never Cut?

Some things look optional but are not. Cutting them does not save time; it makes your test meaningless or puts users at risk.

1. **The core action, done properly.** The one flow that tests your assumption must work from start to finish, every time.
2. **Basic security.** Proper authentication, hashed passwords and protection against common attacks. A breach at MVP stage can end the company. See [password hashing with bcrypt in Node.js](/blogs/password-hashing-bcrypt-nodejs) for the minimum standard.
3. **User data protection.** Backups, sensible access control and not logging sensitive data.
4. **A way to learn.** Basic analytics on the core flow, plus a direct way for users to give feedback. An MVP you cannot learn from is just a small product.
5. **Enough polish to be taken seriously.** Users should judge the idea, not trip over bugs. Polish does not mean beautiful; it means the core flow feels reliable.

## What Does This Look Like in a Real MVP?

When I [shipped an LMS MVP in 5 days](/blogs/how-i-shipped-mvp-in-5-days), the startup's riskiest assumption was: *will teachers upload real courses, and will learners watch them on this platform?*

Here is how the scope broke down:

**Kept:**
- Institute and teacher registration
- Course and video upload
- Video processing and streaming
- A course recommendation bot to help learners find courses

**Cut (built later):**
- Payment gateway
- Subscription module
- The full set of administration rules

Payments mattered for the business, but they did not help answer the question. The founder could validate demand first and add monetization once teachers and learners showed up. The startup validated the idea about two weeks after delivery, and full development started from there.

## How Does AI Change MVP Scope?

AI features add a specific temptation: building the "smart" version before proving anyone wants the basic one. Two rules help:

- **Test the outcome before the automation.** If your product promises AI-generated reports, you can produce the first few by hand, or with heavy human review, to confirm users value the output.
- **Keep the AI feature narrow.** One well-defined task with clear inputs and outputs beats a general assistant. I cover this in more detail in [what an AI MVP actually looks like](/blogs/what-ai-mvp-looks-like).

## What Are the Most Common MVP Scope Mistakes?

- **Building for investors instead of users.** Features added to impress in a demo rarely help you learn.
- **Copying a competitor's full feature set.** They built it over years, with users you do not have yet.
- **Scaling infrastructure too early.** Your MVP does not need to handle a million users. See [how to choose a tech stack for your MVP](/blogs/choose-tech-stack-startup-mvp) for what it does need.
- **Never writing the "later" list.** Without it, every cut feels like a loss and scope creeps back in.
- **Cutting the learning loop.** Shipping without analytics or feedback channels, then guessing why users left.

## The Short Version

1. Write your riskiest assumption in one sentence.
2. Keep only the features that help test it.
3. Fake what you can with manual work.
4. Never cut the core action, security, data protection or your ability to learn.
5. Park everything else on a "later" list.

If you have a feature list and are not sure what to cut, [book a call](/how-i-help/build-your-product). Bring your list and your riskiest assumption, and we will turn it into an MVP scope you can build in weeks, not months.

## Frequently Asked Questions

**How do I decide which features go into my MVP?**  
Write down the riskiest assumption your business depends on, then test every feature against one question: does it help prove or disprove that assumption? If yes, it stays. If the test still works without it, cut it or fake it. Everything else goes on a later list.

**What features should you cut from an MVP?**  
Usually admin dashboards, complex roles, payments when you can invoice manually, settings pages, extra notifications, multiple languages, native apps when a responsive web app works, advanced analytics and unrequested integrations. Cut anything that serves a future user rather than the first ten.

**What should never be cut from an MVP?**  
The core action that tests your assumption, basic security, user data protection, a way to learn from users, and enough reliability that users judge the idea rather than the bugs.

**How many features should an MVP have?**  
There is no fixed number, but most good MVPs have one core flow users complete end to end, plus the minimum around it. If you cannot describe the MVP in one sentence starting with "A user can...", the scope is probably too large.

**Can I fake features in an MVP?**  
Yes, and you often should. Manual work behind the scenes, sometimes called a concierge or Wizard of Oz MVP, lets you test whether users want an outcome before building the automation.
