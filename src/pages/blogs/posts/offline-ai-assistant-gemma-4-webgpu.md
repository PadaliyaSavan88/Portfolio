---
title: 'Build an Offline AI Assistant with Gemma 4'
date: '2026-08-02'
dateModified: '2026-08-05'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'How I used Gemma 4 and WebGPU to run a private, offline AI assistant entirely in the browser: no API keys, no server, no cloud costs.'
keyword: 'Gemma 4, offline AI assistant, WebGPU LLM, run LLM in browser, Gemma quantization, web-llm, on-device AI, local LLM chatbot, chat template control tokens'
topic: 'AI Engineering'
faq:
  - question: "Can Gemma 4 really run entirely offline in a browser?"
    answer: "Yes. Using WebGPU and a runtime like @mlc-ai/web-llm, a quantized Gemma model downloads once (cached by the browser) and runs all inference locally on your device's GPU. After the first load, no network request is made. The model works with Wi-Fi off."
  - question: "How much smaller does quantization make Gemma?"
    answer: "A 2-billion-parameter model stored at FP16 precision needs roughly 4.0GB of VRAM. Quantizing those same weights down to 4-bit integers (INT4) shrinks that to about 1.4GB, a ~65% reduction, with negligible loss in reasoning accuracy. That's the difference between a browser tab crashing with an out-of-memory error and the model actually loading."
  - question: "Why do LLMs need a chat template instead of just plain text?"
    answer: "Base LLMs are pure next-token predictors: they have no built-in concept of \"user\" versus \"assistant.\" A chat template wraps every message in control tokens like <start_of_turn>user and <end_of_turn> so the model can distinguish who said what across a multi-turn conversation. Skip the template and the model either rambles or hallucinates turns that never happened."
  - question: "What are the actual benefits of an offline AI assistant over a cloud API?"
    answer: "Three concrete ones: no data ever leaves the device (eliminates data vulnerability), no per-token API bill regardless of usage (eliminates financial overhead), and no round-trip to a server (eliminates network latency). The tradeoff is a one-time model download and being bound by the user's own GPU."
  - question: "Do I need a powerful GPU to run Gemma locally?"
    answer: "You need a browser and GPU with WebGPU support (recent Chrome or Edge, desktop, hardware acceleration on). Quantization is exactly what makes this feasible on consumer hardware. An INT4 Gemma 2B fits comfortably in the VRAM of a typical laptop GPU where the unquantized FP16 version would not."
---

Running a large language model entirely offline, inside a browser tab, with no server and no API key, is possible today because of two things working together: aggressive model quantization and WebGPU. This post is the companion to a talk I gave, **"Bypassing the Cloud: Building an Offline Assistant with Gemma 4,"** walking through why you'd want this, how Gemma 4 makes it practical, and the live demos and code to try it yourself.

## Why Go Offline in the First Place?

Every cloud-based AI feature carries three costs that don't show up until you're at scale:

- **Data vulnerability.** Anything sent to a third-party API leaves your control the moment it's transmitted.
- **Financial overhead.** Per-token billing scales linearly with usage: a chatbot that gets popular becomes a chatbot that gets expensive.
- **Network latency.** Every request is a round trip. On a slow connection, or with no connection at all, the feature simply doesn't work.

An offline assistant sidesteps all three. The model runs on the user's own hardware: private by construction, free after the initial download, and functional with the network off entirely.

## What Is Gemma 4?

Gemma shares its research lineage directly with Google's flagship Gemini models: same technical infrastructure, same safety alignment work, but released as open weights. Three things make it the right fit for local, offline use:

- **Gemini DNA:** built using the same research and safety alignment as Gemini, not a distilled or unrelated side project.
- **Open weights philosophy:** Google publishes the fully trained model parameters, not just an API, so you can inspect, customize, and fine-tune the actual model.
- **Commercial flexibility:** you can self-host, deploy, alter, or fine-tune Gemma models across whatever hardware stack you're targeting, with no per-request licensing friction.

### The Gemma 4 Family

Gemma 4 ships as two distinct tiers, and picking the right one is really a hardware question:

**E2B & E4B:** a new level of intelligence for mobile and IoT devices, with audio and vision support for real-time edge processing. These are the sizes that make sense for a browser tab or a phone.

**12B, 26B, 31B:** frontier intelligence with advanced reasoning for IDEs, coding assistants, and agentic workflows. Optimized for consumer GPUs, turning a workstation into a local-first AI server for students, researchers, and developers who want to skip the API bill entirely.

For the browser demo in this post, we're in E2B/E4B territory: small enough to load and run entirely client-side.

## Running Bigger Models with Less GPU

Here's the constraint that makes or breaks a browser-based LLM: **VRAM**.

A 2-billion-parameter model contains, unsurprisingly, two billion active weights. Stored at standard FP16 precision, loading it requires roughly **4.0GB of VRAM**. That alone isn't fatal, but the browser also needs headroom for token context processing. Run an uncompressed model and there's zero memory left over, and the tab crashes with an out-of-memory error the moment you send a real prompt.

The fix is **quantization**: scaling down the numerical precision of the model's weights to shrink its memory footprint without meaningfully changing what it outputs.

- **The math:** high-fidelity 16-bit floating-point decimals (FP16) get compressed down to 4-bit integers (INT4).
- **The optimization:** model size drops from 4.0GB to a lean **1.4GB**, with negligible loss in reasoning accuracy.
- **The hardware gain:** smaller data types let consumer GPUs process the underlying matrix math faster, which directly translates to more tokens generated per second.

That 1.4GB footprint is what makes it realistic to ship an LLM as a one-time browser download instead of a server dependency.

## The Mechanics of Chat Templates

A base LLM is a pure predictive text-completion engine: give it a string, it predicts the next token. It has no inherent concept of "user" and "assistant" as separate roles. To hold an actual conversation, that distinction has to be encoded directly into the text the model sees, using **control tokens** that mark structural boundaries within the context window:

```
<start_of_turn>user [User Prompt Payload]<end_of_turn> <start_of_turn>model
```

Every message you send gets wrapped in this format before it reaches the model, and the model's own reply continues right after `<start_of_turn>model`. Skip this formatting and the model can't reliably tell where your input ends and its own output should begin. That's exactly why every serious LLM runtime (including the one behind the demo below) applies this template automatically rather than sending raw strings.

## See It Running

I've got two things you can try right now, both running Gemma via WebGPU with zero server involvement:

- **[Live WebGPU demo](/gdg-assistant):** a working assistant on this site, answering questions about a local tech community using a small retrieval-augmented knowledge base, entirely client-side. First load downloads the quantized model (cached after); everything after that runs offline.
- **[Offline Gemma demo (Next.js source)](https://github.com/PadaliyaSavan88/Nextjs-gemma-chat):** the reference implementation behind that demo, if you want to see exactly how the model is loaded and the chat template applied.

## Get Started Building Your Own

Two boilerplates to start from, depending on your stack:

- **[Next.js + web-llm boilerplate](https://github.com/PadaliyaSavan88/Nextjs-gemma-chat):** client-side WebGPU inference, no backend required.
- **[FastAPI + Gemma boilerplate](https://github.com/PadaliyaSavan88/fastapi-gemma-chat):** a Python server-side setup, for cases where you want Gemma running on infrastructure you control rather than the end user's browser.

For the official model docs and the runtime library used in both demos: [Gemma on ai.google.dev](https://ai.google.dev/gemma) and [@mlc-ai/web-llm on GitHub](https://github.com/mlc-ai/web-llm).

## Frequently Asked Questions

**Can Gemma 4 really run entirely offline in a browser?**
Yes. Using WebGPU and a runtime like `@mlc-ai/web-llm`, a quantized Gemma model downloads once (cached by the browser) and runs all inference locally on your device's GPU. After the first load, no network request is made. The model works with Wi-Fi off.

**How much smaller does quantization make Gemma?**
A 2-billion-parameter model stored at FP16 precision needs roughly 4.0GB of VRAM. Quantizing those same weights down to 4-bit integers (INT4) shrinks that to about 1.4GB, a ~65% reduction, with negligible loss in reasoning accuracy. That's the difference between a browser tab crashing with an out-of-memory error and the model actually loading.

**Why do LLMs need a chat template instead of just plain text?**
Base LLMs are pure next-token predictors: they have no built-in concept of "user" versus "assistant." A chat template wraps every message in control tokens like `<start_of_turn>user` and `<end_of_turn>` so the model can distinguish who said what across a multi-turn conversation. Skip the template and the model either rambles or hallucinates turns that never happened.

**What are the actual benefits of an offline AI assistant over a cloud API?**
Three concrete ones: no data ever leaves the device (eliminates data vulnerability), no per-token API bill regardless of usage (eliminates financial overhead), and no round-trip to a server (eliminates network latency). The tradeoff is a one-time model download and being bound by the user's own GPU.

**Do I need a powerful GPU to run Gemma locally?**
You need a browser and GPU with WebGPU support (recent Chrome or Edge, desktop, hardware acceleration on). Quantization is exactly what makes this feasible on consumer hardware. An INT4 Gemma 2B fits comfortably in the VRAM of a typical laptop GPU where the unquantized FP16 version would not.

---

Related reading: [Reduce LLM API Costs in Production](/blogs/reduce-llm-api-costs-production), [RAG Architecture for JavaScript Developers](/blogs/rag-architecture-for-javascript-developers), [Prompt Engineering for Production LLM Apps](/blogs/prompt-engineering-production-llm-apps).
