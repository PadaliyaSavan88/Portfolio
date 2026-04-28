

# Blog Content & Interlinking Plan

## Current Posts (Existing)

| ID | Slug | Title | Date | Cluster |
|----|------|-------|------|---------|
| P1 | `rag-architecture-for-javascript-developers` | RAG Architecture for JavaScript Developers | Mar 2026 | AI Stack |
| P2 | `vertex-ai-setup-for-nodejs-apps` | Vertex AI Setup for Node.js Apps | Mar 2026 | AI Stack |
| P3 | `openai-vs-vertex-ai-for-production-saas` | OpenAI vs Vertex AI for Production SaaS | Mar 2026 | AI Stack |
| P4 | `how-to-monitor-ai-pipelines-in-production` | How to Monitor AI Pipelines in Production | Apr 2026 | AI Stack |
| P5 | `google-cloud-ai-setup-guide` | Setting Up AI Workloads on Google Cloud | Mar 2025 | AI Stack |
| P6 | `type-or-not-to-type-the-javascript-vs-typescript-dilemma` | Type or Not to Type: JS vs TypeScript | Jan 2024 | JS/TS |
| P7 | `developers-missing-why-and-what` | Developers Are Great at HOW. But What About WHY and WHAT? | Apr 2026 | Mindset |
| P8 | `junior-developer-job-market-fear` | Junior Developers: The Job Market Isn't Your Enemy | Apr 2026 | Mindset |
| P9 | `what-happens-when-you-type-a-url` | What Actually Happens When You Hit Enter After Typing a URL | Apr 2026 | Fundamentals |
| A1 | `langchainjs-agents-nodejs-tutorial` | LangChain.js Agents: Build Your First AI Agent in Node.js | Apr 2026 | AI Stack ✅ |
| A2 | `vector-database-comparison-chroma-pinecone-pgvector` | Choosing a Vector Database: Chroma vs Pinecone vs pgvector | Apr 2026 | AI Stack ✅ |
| A3 | `prompt-engineering-production-llm-apps` | Prompt Engineering for Production LLM Apps | Apr 2026 | AI Stack ✅ |
| A4 | `deploy-nodejs-ai-app-cloud-run` | Deploying AI Apps to Cloud Run: Node.js + Vertex AI | Apr 2026 | AI Stack ✅ |
| A5 | `reduce-llm-api-costs-production` | How to Reduce LLM API Costs in Production | Apr 2026 | AI Stack ✅ |

---

## Applied Internal Links (Already Done)

### P1 — RAG Architecture
- "OpenAI" (intro) → **P3** OpenAI vs Vertex AI
- "choosing the right LLM provider" (RAG vs Fine-Tuning section) → **P3**
- "How to Monitor AI Pipelines in Production" (end CTA) → **P4**

### P2 — Vertex AI Setup
- Prerequisites callout → **P5** Google Cloud Setup Guide
- "OpenAI vs Vertex AI" (intro) → **P3**
- End CTA → **P4** Monitor AI Pipelines

### P3 — OpenAI vs Vertex AI
- "production RAG pipelines" (Embeddings section) → **P1**
- "LangChain.js" (vendor lock-in section) → **P1**
- Decision table — Vertex AI row → **P2**
- End CTA → **P4** Monitor AI Pipelines

### P4 — Monitor AI Pipelines
- "OpenAI and Vertex AI" (logger section) → **P3**
- "LangChain.js" (LangSmith section) → **P1**
- "RAG pipelines" (LangSmith section) → **P1**

### P5 — Google Cloud AI Setup
- "Vertex AI API" (Step 2 enable APIs) → **P2**
- What's Next section → **P2** + **P3**

### P6 — JS vs TypeScript
- Conclusion → **P1** RAG Architecture, **P7** WHY/WHAT/HOW

### P7 — WHY/WHAT/HOW
- "AI can generate HOW faster than ever" → **P3**
- FAQ end section → **P3** + **P1**

---

## Future Blog Topics

Sorted by priority. Each entry includes the target slug, cluster, estimated keyword value,
incoming links (existing posts that should link to it), and outgoing links (posts it should link to).

---

### Cluster A — AI/LLM Stack ✅ COMPLETE

---

#### A1. LangChain.js Agents: Build Your First AI Agent in Node.js ✅ PUBLISHED
- **Suggested slug:** `langchainjs-agents-nodejs-tutorial`
- **Target keywords:** LangChain.js agents, AI agents Node.js, LangChain tools, autonomous AI Node.js
- **Why write it:** LangChain is already mentioned in P1, P3, P4 with no dedicated explainer. High search volume. Natural hub for the AI cluster.
- **Incoming links to add (update these posts once published):**
  - P1 — "LangChain.js" in intro sentence
  - P3 — "LangChain.js takes this further" in vendor lock-in section
  - P4 — "LangChain.js" in LangSmith section
- **Outgoing links from this post:**
  - P1 — RAG Architecture (RAG as a tool for agents)
  - P2 — Vertex AI Setup (use Vertex AI as the LLM backend)
  - P4 — Monitor AI Pipelines (how to monitor agent runs with LangSmith)
- **Services connection:** AI Integration, Rapid Prototyping

---

#### A2. Choosing a Vector Database: Chroma vs Pinecone vs pgvector ✅ PUBLISHED
- **Suggested slug:** `vector-database-comparison-chroma-pinecone-pgvector`
- **Target keywords:** vector database comparison, Chroma vs Pinecone, pgvector Node.js, RAG vector store
- **Why write it:** P1 mentions Chroma, Pinecone, and Weaviate in one sentence with no explanation. This is the natural companion post and captures decision-stage search queries.
- **Incoming links to add:**
  - P1 — "vector database" and "Chroma, Pinecone, pgvector" in the Pipeline section
  - A1 (Agents) — agent memory / knowledge base section
- **Outgoing links from this post:**
  - P1 — RAG Architecture (the pipeline that uses these stores)
  - P4 — Monitor AI Pipelines (monitoring retrieval quality)
- **Services connection:** AI Integration, Full Stack Development

---

#### A3. Prompt Engineering for Production LLM Apps ✅ PUBLISHED
- **Suggested slug:** `prompt-engineering-production-llm-apps`
- **Target keywords:** prompt engineering, system prompt, LLM prompt design, production prompts Node.js
- **Why write it:** Temperature, context injection, and output quality are mentioned in P1 and P4 but never taught. High search volume. Strengthens topical authority across the whole AI cluster.
- **Incoming links to add:**
  - P1 — "Setting temperature: 0 is critical" in the pipeline section
  - P3 — "verbose prompts" in pricing section
  - P4 — "Confidence scoring" in hallucination section
- **Outgoing links from this post:**
  - P1 — RAG Architecture (how good prompts interact with retrieved context)
  - P4 — Monitor AI Pipelines (evaluating prompt quality in production)
  - P3 — OpenAI vs Vertex AI (how prompts differ per provider)
- **Services connection:** AI Integration, Technical Consulting

---

#### A4. Deploying AI Apps to Cloud Run: Node.js + Vertex AI ✅ PUBLISHED
- **Suggested slug:** `deploy-nodejs-ai-app-cloud-run`
- **Target keywords:** Cloud Run Node.js, deploy AI app Google Cloud, Vertex AI Cloud Run, serverless AI
- **Why write it:** P5 mentions Cloud Run as a deployment option and P2 mentions it for production compute — but neither shows how. Closes the full GCP journey: setup → integrate → deploy.
- **Incoming links to add:**
  - P2 — "In production (Cloud Run, GKE, etc.)" in authentication section
  - P5 — "Cloud Run" in deployment section
- **Outgoing links from this post:**
  - P2 — Vertex AI Setup (the integration being deployed)
  - P5 — Google Cloud Setup (GCP prerequisites)
  - P4 — Monitor AI Pipelines (observability after deployment)
- **Services connection:** Full Stack Development, AI Integration

---

#### A5. How to Reduce LLM API Costs in Production ✅ PUBLISHED
- **Suggested slug:** `reduce-llm-api-costs-production`
- **Target keywords:** reduce OpenAI costs, LLM cost optimization, Gemini Flash vs GPT-4o mini, AI API budget
- **Why write it:** Cost is the #1 concern after teams ship their first AI feature. P3 sets it up with a pricing table and P4 has a cost tracking logger — this post is the natural payoff for both.
- **Incoming links to add:**
  - P3 — Pricing section ("run your actual prompts through both APIs")
  - P4 — "Cost Per Request" section
- **Outgoing links from this post:**
  - P3 — OpenAI vs Vertex AI (model selection for cost)
  - P4 — Monitor AI Pipelines (tracking costs)
  - P1 — RAG Architecture (chunking strategy affects token count)
- **Services connection:** Technical Consulting, AI Integration

---

### Cluster B — JavaScript / TypeScript / Node.js

---

#### B1. TypeScript for AI Applications: Typing LLM Responses in Node.js ⭐ HIGHEST PRIORITY
- **Suggested slug:** `typescript-for-ai-applications-nodejs`
- **Target keywords:** TypeScript OpenAI Node.js, type LLM response TypeScript, TypeScript AI app, typed Vertex AI
- **Why write it:** This is the single most strategic post in the plan. P6 (JS vs TypeScript) is completely isolated from the AI cluster. This post bridges them directly — a reader who finds P6 via Google now has a path into every AI post.
- **Incoming links to add:**
  - P6 — "server-side functionalities" section and conclusion
  - P1 — "Node.js" in intro (TypeScript alternative)
  - P2 — "Node.js 18+" in prerequisites
- **Outgoing links from this post:**
  - P6 — JS vs TypeScript (language background)
  - P1 — RAG Architecture (practical JS example this post types)
  - P2 — Vertex AI Setup (the SDK being typed)
  - P4 — Monitor AI Pipelines (typed logger patterns)
- **Services connection:** Full Stack Development

---

#### B2. Building a REST API with Node.js + TypeScript: Production Patterns
- **Suggested slug:** `nodejs-typescript-rest-api-production`
- **Target keywords:** Node.js TypeScript API, Express TypeScript, REST API Node.js production, typed Node.js backend
- **Why write it:** Foundational post. Many AI posts assume a Node.js/TS API already exists. This becomes a prerequisite post that every AI post can link back to.
- **Incoming links to add:**
  - P6 — TypeScript section
  - B1 — "building the API layer" section
- **Outgoing links from this post:**
  - P6 — JS vs TypeScript
  - P4 — Monitor AI Pipelines (monitoring the API)
  - B1 — TypeScript for AI Applications
- **Services connection:** Full Stack Development

---

### Cluster C — Product Thinking / Senior Engineering

---

#### C1. How I Shipped an MVP in 5 Days: What Actually Worked
- **Suggested slug:** `how-i-shipped-mvp-in-5-days`
- **Target keywords:** ship MVP fast, rapid prototyping process, build MVP startup, MVP in days
- **Why write it:** P7 is currently a standalone island. This gives it a practical, story-driven companion. Also maps directly to your "Rapid Prototyping" service page section — strong conversion intent.
- **Incoming links to add:**
  - P7 — "Separate discovery from delivery" principle
- **Outgoing links from this post:**
  - P7 — WHY/WHAT/HOW (the mindset behind the process)
  - P3 — OpenAI vs Vertex AI (AI tools used in the MVP)
  - P1 — RAG Architecture (if AI was involved in the MVP)
- **Services connection:** Rapid Prototyping (direct)

---

#### C2. AI Is Not the Product: Why Most AI Features Fail ⭐ HIGH PRIORITY
- **Suggested slug:** `why-ai-features-fail-product-thinking`
- **Target keywords:** AI features that fail, AI product strategy, building AI products, AI integration mistakes
- **Why write it:** Bridges P7 (product thinking) into the AI technical cluster. Strong opinionated take that will get shared. Maps to your "Technical Consulting" service. Current high-search topic.
- **Incoming links to add:**
  - P7 — "WHY ties the product to a user's real need" section
  - P4 — "Output Quality Signals" section (what failure looks like in prod)
  - P3 — Conclusion (choosing a provider is not the same as having a product)
- **Outgoing links from this post:**
  - P7 — WHY/WHAT/HOW (the mindset framework)
  - P3 — OpenAI vs Vertex AI (platform choice matters less than problem definition)
  - P4 — Monitor AI Pipelines (measuring whether the feature is actually working)
- **Services connection:** Technical Consulting (direct)

---

#### C3. System Design for AI-Powered SaaS: What I Learned Building at Scale
- **Suggested slug:** `system-design-ai-powered-saas`
- **Target keywords:** system design AI SaaS, AI architecture production, scalable AI system, LLM SaaS architecture
- **Why write it:** Becomes a "hub" post that links across all three clusters. Senior-level keyword. Leverages your real experience (69.9M citizens, food delivery SaaS, enterprise document search) and maps to the About page story.
- **Incoming links to add:**
  - P3 — "Many mature SaaS products end up using both" (conclusion)
  - P4 — "Monitoring AI pipelines is an ongoing practice" (final sentence)
  - P7 — "Architectural choices" (FAQ section)
- **Outgoing links from this post:**
  - P1 — RAG Architecture
  - P3 — OpenAI vs Vertex AI
  - P4 — Monitor AI Pipelines
  - P7 — WHY/WHAT/HOW
  - B1 — TypeScript for AI (if published)
- **Services connection:** Technical Consulting, Full Stack Development

---

### Cluster D — Tools & Developer Utilities (14 posts, one per tool)

Each post explains how the tool works + the underlying concept. Links back to the tool page and cross-links to related posts in other clusters.

---

#### D1. What Is Base64 Encoding and When Should You Use It?
- **Suggested slug:** `base64-encoding-javascript-explained`
- **Target keywords:** base64 encoding, base64 JavaScript, btoa atob, what is base64, encode decode base64
- **Tool page:** `/tools/base64`
- **Why write it:** "Base64" is searched constantly by developers who encounter it in APIs, JWTs, and data URIs but don't fully understand it. Direct traffic to the tool.
- **Incoming links to add:** P6 (JS/TS) — data handling section; B2 (Node.js API) — auth headers
- **Outgoing links from this post:** `/tools/base64` tool, D3 (Bcrypt/password hashing — related security encoding), P6 (JS/TS)
- **Services connection:** Full Stack Development

---

#### D2. Regular Expressions for JavaScript Developers: A Practical Guide
- **Suggested slug:** `regular-expressions-javascript-guide`
- **Target keywords:** regex JavaScript, regular expressions JS, JavaScript regex examples, regex tutorial
- **Tool page:** `/tools/regex-tester`
- **Why write it:** Regex is evergreen — every developer needs it, most avoid it. A practical JS-focused guide with real examples captures high-volume search. Tool drives engagement.
- **Incoming links to add:** B2 (REST API) — input validation section; A3 (Prompt Engineering) — parsing LLM output
- **Outgoing links from this post:** `/tools/regex-tester` tool, D9 (naming conventions — string transformations), B2 (API validation)
- **Services connection:** Full Stack Development

---

#### D3. Password Hashing with Bcrypt: Why, How, and When
- **Suggested slug:** `password-hashing-bcrypt-nodejs`
- **Target keywords:** bcrypt Node.js, password hashing, bcryptjs, hash password JavaScript, bcrypt rounds
- **Tool page:** `/tools/bcrypt-generator`
- **Why write it:** Security fundamentals with high search volume. Developers integrating auth are actively looking for this. The bcrypt tool lets readers test live — strong content-to-tool funnel.
- **Incoming links to add:** B2 (Node.js REST API) — auth section; B1 (TypeScript for AI) — typed auth middleware
- **Outgoing links from this post:** `/tools/bcrypt-generator` tool, `/tools/password-generator` tool, D14 (password security), B2 (REST API)
- **Services connection:** Full Stack Development, AI Integration (auth patterns)

---

#### D4. Cron Jobs Explained: Scheduling Tasks in Linux and Node.js
- **Suggested slug:** `cron-jobs-scheduling-nodejs-explained`
- **Target keywords:** cron job Node.js, cron expression, crontab, schedule task Node.js, node-cron
- **Tool page:** `/tools/cron-builder`
- **Why write it:** Scheduling is a universal need — backups, emails, data sync, cache invalidation. Cron syntax confuses beginners. The builder tool makes this post hands-on and shareable.
- **Incoming links to add:** A4 (Cloud Run) — scheduled jobs section; B2 (REST API) — background tasks
- **Outgoing links from this post:** `/tools/cron-builder` tool, A4 (Cloud Run scheduling), B2 (Node.js API)
- **Services connection:** Full Stack Development

---

#### D5. UUIDs Explained: What They Are and When to Use Them
- **Suggested slug:** `uuid-explained-when-to-use-javascript`
- **Target keywords:** UUID JavaScript, UUID v4, GUID vs UUID, crypto.randomUUID, unique identifier
- **Tool page:** `/tools/uuid-generator`
- **Why write it:** UUIDs vs auto-increment IDs is a real architecture decision developers face when designing databases and APIs. High-clarity evergreen content.
- **Incoming links to add:** B2 (REST API) — entity ID design section; C3 (System Design SaaS) — database ID strategy
- **Outgoing links from this post:** `/tools/uuid-generator` tool, D7 (crypto randomness — the RNG behind v4), B2 (API design)
- **Services connection:** Full Stack Development

---

#### D6. JSON vs CSV: When to Use Each and How to Convert Between Them
- **Suggested slug:** `json-vs-csv-format-comparison-javascript`
- **Target keywords:** JSON vs CSV, convert JSON to CSV JavaScript, CSV to JSON, data formats comparison
- **Tool page:** `/tools/json-csv-converter`
- **Why write it:** Data interchange is fundamental. Developers building APIs, ETL jobs, and analytics pipelines constantly switch between formats. The converter tool is a direct utility.
- **Incoming links to add:** P1 (RAG Architecture) — document ingestion formats; A5 (Cost Reduction) — batching data for Batch API
- **Outgoing links from this post:** `/tools/json-csv-converter` tool, D13 (JSON formatting), P1 (RAG data ingestion)
- **Services connection:** Full Stack Development, AI Integration

---

#### D7. Cryptographic Randomness in JavaScript: crypto vs Math.random
- **Suggested slug:** `cryptographic-randomness-javascript`
- **Target keywords:** crypto.getRandomValues JavaScript, Math.random vs crypto, secure random JavaScript, CSPRNG
- **Tool page:** `/tools/random-string`
- **Why write it:** Most developers default to Math.random() and don't understand why it's insecure for tokens, IDs, and passwords. An educational post with direct security implications.
- **Incoming links to add:** D3 (Bcrypt) — randomness in salts; D14 (Password Security); B2 (API tokens section)
- **Outgoing links from this post:** `/tools/random-string` tool, `/tools/password-generator` tool, D3 (Bcrypt hashing), D5 (UUID v4 randomness)
- **Services connection:** Full Stack Development

---

#### D8. How QR Codes Work: Encoding, Error Correction, and Data Capacity
- **Suggested slug:** `how-qr-codes-work-encoding-explained`
- **Target keywords:** how do QR codes work, QR code encoding, QR code JavaScript, generate QR code, QR code capacity
- **Tool page:** `/tools/qr-generator`
- **Why write it:** QR codes are everywhere but few developers understand the underlying standard. A curiosity-driven post that performs well for "how does X work" queries. Links naturally to the generator tool.
- **Incoming links to add:** P9 (What Happens When You Type a URL) — encoding/networking fundamentals
- **Outgoing links from this post:** `/tools/qr-generator` tool, P9 (URL/networking fundamentals)
- **Services connection:** Full Stack Development, Rapid Prototyping

---

#### D9. Naming Conventions Every Developer Should Know: camelCase, snake_case & More
- **Suggested slug:** `naming-conventions-camelcase-snakecase-developer-guide`
- **Target keywords:** camelCase vs snake_case, naming conventions programming, PascalCase kebab-case, variable naming
- **Tool page:** `/tools/case-converter`
- **Why write it:** Language-agnostic evergreen content. Every developer has a different background (Python, JS, Ruby) and gets confused by cross-language naming. Strong beginner traffic.
- **Incoming links to add:** P6 (JS vs TypeScript) — TypeScript interface naming; B1 (TypeScript for AI) — type naming
- **Outgoing links from this post:** `/tools/case-converter` tool, D2 (Regex — transforming strings), P6 (JS/TS conventions)
- **Services connection:** Full Stack Development

---

#### D10. How Git Diffs Work: Understanding the LCS Algorithm
- **Suggested slug:** `how-git-diff-works-lcs-algorithm`
- **Target keywords:** how git diff works, diff algorithm, LCS algorithm, Myers diff, text comparison
- **Tool page:** `/tools/diff-checker`
- **Why write it:** Git is used daily but few developers know how diffs are computed. A "how does it work" post with the diff tool for interactive exploration. Unique technical angle.
- **Incoming links to add:** P9 (What Happens When You Type a URL — fundamentals series); B2 (REST API — API versioning and diffs)
- **Outgoing links from this post:** `/tools/diff-checker` tool, P9 (systems fundamentals), B2 (API versioning)
- **Services connection:** Full Stack Development

---

#### D11. Markdown for Developers: Syntax Guide and Rendering Explained
- **Suggested slug:** `markdown-guide-for-developers`
- **Target keywords:** markdown guide, markdown syntax, markdown tutorial, markdown cheat sheet, how markdown works
- **Tool page:** `/tools/markdown-previewer`
- **Why write it:** Markdown is ubiquitous (README files, docs, GitHub issues, blog posts). A practical guide with a live previewer built in drives tool engagement and is endlessly shareable.
- **Incoming links to add:** P7 (Developers WHY/WHAT) — documentation culture; C1 (MVP in 5 Days) — shipping docs fast
- **Outgoing links from this post:** `/tools/markdown-previewer` tool, D10 (how diff works — version control context), P7 (developer craft)
- **Services connection:** Full Stack Development, Rapid Prototyping

---

#### D12. Lorem Ipsum: History, Why Developers Use It, and Better Alternatives
- **Suggested slug:** `lorem-ipsum-placeholder-text-developer-guide`
- **Target keywords:** lorem ipsum, placeholder text, dummy text generators, lorem ipsum history, design placeholder
- **Tool page:** `/tools/lorem-ipsum`
- **Why write it:** Lightest post in the cluster — quick, fun, educational. Targets designers and front-end developers. Low competition. The tool drives direct conversions.
- **Incoming links to add:** D11 (Markdown guide — placeholder content while writing); C1 (MVP in 5 Days — prototyping with placeholder content)
- **Outgoing links from this post:** `/tools/lorem-ipsum` tool, `/tools/markdown-previewer` tool, C1 (MVP fast shipping)
- **Services connection:** Rapid Prototyping

---

#### D13. JSON Formatting and Validation in JavaScript: What Every Developer Should Know
- **Suggested slug:** `json-formatting-validation-javascript`
- **Target keywords:** JSON format JavaScript, validate JSON, JSON.parse, JSON.stringify, JSON errors, format JSON
- **Tool page:** `/tools/json-formatter`
- **Why write it:** JSON is the most common data format in web development. Formatting and validation errors are among the most Googled JS topics. The formatter tool provides direct hands-on value.
- **Incoming links to add:** P1 (RAG Architecture — JSON responses from LLMs); A3 (Prompt Engineering — JSON mode output)
- **Outgoing links from this post:** `/tools/json-formatter` tool, D6 (JSON vs CSV), P1 (RAG — LLM JSON output), A3 (JSON mode prompting)
- **Services connection:** Full Stack Development, AI Integration

---

#### D14. Password Security Best Practices for Web Developers
- **Suggested slug:** `password-security-best-practices-web-developers`
- **Target keywords:** password security web development, secure password storage, OWASP passwords, password best practices
- **Tool page:** `/tools/password-generator`
- **Why write it:** Security is a top developer concern. This post ties together randomness (D7), bcrypt (D3), and the password generator tool. Acts as a hub for the security sub-cluster within Cluster D.
- **Incoming links to add:** D3 (Bcrypt hashing — read this for context); B2 (REST API — auth section); D7 (Crypto randomness)
- **Outgoing links from this post:** `/tools/password-generator` tool, D3 (Bcrypt), D7 (Cryptographic randomness), B2 (Node.js API auth)
- **Services connection:** Full Stack Development, Technical Consulting

---

## Writing Priority Order

| Priority | Post | Reason |
|----------|------|--------|
| 1 | **B1** TypeScript for AI | Rescues isolated P6 immediately; bridges two clusters |
| 2 | **A1** LangChain.js Agents | Fills biggest gap in strongest cluster; LangChain cited in 3 posts |
| 3 | **C2** AI Is Not the Product | High topical authority signal; maps to consulting service |
| 4 | **A3** Prompt Engineering | Referenced implicitly in 3 posts; high search volume |
| 5 | **A2** Vector DB Comparison | Closes open loop in P1; strong decision-stage keyword |
| 6 | **C1** MVP in 5 Days | Gives P7 a companion; ties to Rapid Prototyping service |
| 7 | **A5** Cost Reduction | High conversion intent; P3 + P4 both set it up |
| 8 | **A4** Cloud Run Deploy | Closes GCP journey; P2 + P5 set it up |
| 9 | **C3** System Design SaaS | Hub post; best written after A1–A3 are live |
| 10 | **B2** Node.js TS API | Foundational; better as a supporting post once cluster is denser |

---

## Target Interlinking Graph (Final State)

```
P5 ──→ P2 ──→ P3 ──→ P4
        ↑      ↑      ↑
       A4    A5(cost) A3(prompts)
        
P1 (RAG) ←──────────────────→ P4
   ↑↓                          ↑
A2 (VectorDB)    A1 (Agents) ──┘
                    ↑
                  P3, P4

P6 (JS/TS) ──→ B1 (TS for AI) ──→ P1, P2, P4
                                    
P7 (WHY/WHAT) ←─→ C2 (AI fails) ──→ P3, P4
      ↑                 
    C1 (MVP)     C3 (System Design) ──→ P1, P3, P4, P7
```

---

## Notes

- All internal links use the path format `/blogs/[slug]` (no trailing slash needed in markdown)
- Avoid linking to a post more than 2–3 times within a single article — it looks spammy to crawlers
- Each new post should link to at least 2 existing posts on first publish
- Update this file each time a new post is published and links are applied
