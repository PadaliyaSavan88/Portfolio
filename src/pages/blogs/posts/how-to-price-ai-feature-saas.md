---
title: 'How to Price an AI Feature Without Losing Money'
date: '2026-05-21'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'Pricing AI features wrong is the fastest way to destroy your SaaS margins. Per-seat vs usage-based vs token passthrough — the real math and the model that protects you.'
dateModified: '2026-05-21'
keyword: 'ai feature pricing, saas ai pricing, how to price ai features, usage based pricing ai, ai api cost pricing model, llm pricing saas, ai saas margins, openai cost saas pricing'
topic: 'Startups'
faq:
  - question: "Why is pricing AI features different from pricing regular SaaS features?"
    answer: "Regular SaaS features have near-zero marginal cost per user — once the code is written, serving one more user costs almost nothing. AI features have real marginal cost: every LLM call costs money in API fees. This means your traditional per-seat pricing model can destroy your margins if heavy users generate far more AI calls than light users. You need to price in a way that covers your per-usage AI costs, not just your infrastructure overhead."
  - question: "What is the biggest pricing mistake AI SaaS founders make?"
    answer: "Pricing per seat without modeling actual usage distribution. A founder assumes 'average usage' and sets a per-seat price that covers it. Then the top 10% of users generate 60% of all AI calls, the average cost per seat exceeds the price, and margins invert as the product grows. The fix is to model P90 and P99 usage — price for your heavy users, not your median user."
  - question: "Should AI SaaS companies use usage-based pricing?"
    answer: "Usage-based pricing (charging per AI call or per output token) perfectly aligns your revenue with your costs, but it creates two problems: unpredictable revenue for you and unpredictable bills for customers. A hybrid model — a base seat fee plus a usage allowance, with overages charged beyond the allowance — gives you cost coverage while keeping predictability for both sides."
  - question: "How do you calculate the right price floor for an AI feature?"
    answer: "Take your API cost for the feature at P90 usage (the 90th percentile of your heavy users, not the average). Multiply by 1.5 for infrastructure and operational overhead. Multiply by 3-5 for your target gross margin. That is your price floor per user per month. If your target market cannot bear that price, your current AI implementation cost is too high and you need to optimize the model usage first."
  - question: "What is model routing and why does it matter for AI pricing?"
    answer: "Model routing means using different AI models for different tasks based on complexity — a cheap, fast model for simple classifications or summaries, an expensive frontier model only for tasks that genuinely need it. A GPT-4o call costs roughly 15x what a GPT-4o-mini call costs. Routing 70% of requests to the cheaper model while maintaining quality on the 30% that need the frontier model can reduce your per-user AI cost by 60-70%."
---

A startup founder told me they had reached $30,000 in monthly recurring revenue and were still losing money on every customer. The unit economics looked fine on paper. The problem was their AI feature: customers were using it far more than modeled, and the API bills were eating the margin.

This is the pricing trap that kills AI SaaS businesses. It is not obvious until it is expensive, and by then you have customers at a price you cannot raise without churn.

Here is how to avoid it.

## Why AI Changes the Math

Traditional SaaS has an economics profile that founders understand intuitively: high fixed costs (engineering, infrastructure), near-zero marginal cost per customer. Once the product is built, adding the next customer costs almost nothing. This is why SaaS businesses can scale to very high margins.

AI features break this model. Every LLM call has a real cost that scales with usage. A customer who uses your AI writing tool to generate 50 pieces of content per month costs you more than a customer who uses it to generate 5. But with a flat per-seat price, they pay the same.

The consequence: as your best customers — the ones who find the most value, use it most, and are least likely to churn — increase their usage, your margin on them decreases. Growth in engagement hurts your economics. That is the opposite of how a healthy SaaS should work.

## The Mistake: Pricing to Average Usage

Most founders model AI pricing by estimating average API cost per user and building margin on top. The problem is that usage does not distribute evenly.

A typical distribution: the top 10% of users generate 50-60% of all AI calls. The median user generates a fraction of what the mean user generates. If you price to the mean, your heavy users — the ones driving most of your API costs — are almost certainly unprofitable.

**The correct model is to price to P90 usage**, not average usage. P90 is the 90th percentile — the usage level that 90% of your users are at or below. Price to cover the cost of your heavy users, and your median users become high-margin. Do not price to the middle and let your best customers subsidize each other's losses.

## The Four Pricing Models

**1. Pure per-seat (flat)**

Charge a fixed monthly fee per user regardless of usage.

Works when: usage variance is genuinely low and predictable. Almost never works for AI-heavy features where usage correlates with customer health.

Risk: heavy users invert your margins. You may not notice until you are at scale.

**2. Pure usage-based**

Charge directly based on AI calls, tokens, or outputs generated.

Works when: you want perfect cost alignment and your customers are comfortable with variable bills. Common in developer tools and API products.

Risk: customers hate unpredictable bills. Usage-based pricing creates anxiety and artificially suppresses engagement — customers self-ration to avoid charges. You get margin protection but lose the usage growth that compounds your product's value.

**3. Seat + allowance (hybrid)**

Charge a base per-seat fee that includes a usage allowance, with overage fees for usage beyond the allowance.

This is the model that works for most consumer-facing AI SaaS. It gives customers a predictable base cost, gives you a margin floor, and aligns revenue with value for heavy users through overages.

Set the allowance at approximately P70-P80 of your usage distribution — most customers never exceed it, they feel like they are getting the full product, and heavy users pay the marginal cost of their actual usage.

**4. Tiered plans with usage limits**

Different plan tiers have different usage caps. Customers self-select into the tier that fits their usage.

Works when: your customer base has clearly distinct usage segments. The risk is that customers hit caps at inopportune moments and churn rather than upgrade. Design tier limits so that upgrading is the obvious next step, not an unpleasant wall.

## The Numbers You Need Before Setting a Price

Before pricing any AI feature, calculate three things:

**API cost at P50 usage** — what does the median user's monthly usage cost in API fees?

**API cost at P90 usage** — what does a heavy user's monthly usage cost?

**API cost at P99 usage** — what is your worst-case monthly cost per user? This is your stress test.

Then decide: at your target price, are P90 users profitable? If not, you either need to raise the price, add an overage mechanism, or reduce the API cost through optimization.

A rough target for AI-heavy SaaS: gross margin of 60-70% (versus 80-90% for traditional SaaS). You are trading some margin for the product capability. Below 60% is a warning sign at scale.

## Reducing Your Cost Per User

If P90 usage makes your pricing untenable, the answer is usually not to raise prices — it is to reduce cost per AI call.

**Model routing** — Use a smaller, cheaper model for simple tasks and a frontier model only when necessary. A GPT-4o-mini call is roughly 15x cheaper than a GPT-4o call. If 70% of your AI calls are tasks that a smaller model handles well, routing them appropriately can cut your API spend by 60% or more without the user noticing.

**Response caching** — If users ask similar questions or run similar prompts, cache results. Even a 20% cache hit rate has a meaningful impact on monthly API bills.

**Prompt optimization** — Long system prompts and large context windows are expensive. Audit your prompts for verbosity. Trimming unnecessary context can reduce token usage by 20-40% with no quality degradation.

**Output length constraints** — LLM costs scale with both input and output tokens. If your use case does not require long outputs, constrain the max output length. Customers rarely notice the difference.

## How to Raise Prices on Existing Customers

If you priced wrong early and need to raise prices, the playbook is:

Lock in existing customers at their current price for 12 months with a clear end date. Announce the new pricing and new plan structure with enough lead time. Communicate the value delivered — this is a good time to share usage data, features shipped, and improvements made since they joined.

Price increases that are accompanied by a clear product narrative ("we have shipped X, Y, and Z since you joined, and the product you are using now is significantly more capable") land better than price increases without context.

The worst time to fix pricing is when you have 200 customers at a price you cannot afford to keep. The best time is before you have 10.

## The Decision for Pre-Launch Founders

If you have not launched yet, start with the seat plus allowance model. Set the allowance at a level you can profitably support at P90 usage. Make the allowance generous enough that 80% of customers never think about it, but real enough that heavy users see the overage mechanism before it surprises them.

Price to your P90 API cost, not your average. Build in a 3x margin on top. If that price seems high for your market, the right response is to reduce your API cost through optimization — not to compress your margin and hope the usage distribution is better than the data suggests.

AI SaaS margins are real and achievable. The founders who get there model their costs carefully before they set prices, not after.
