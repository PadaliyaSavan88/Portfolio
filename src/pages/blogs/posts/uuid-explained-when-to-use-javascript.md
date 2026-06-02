---
title: 'UUID v4 in JavaScript: When to Use One'
date: '2026-05-29'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'UUID v4 vs v7, GUID vs UUID, and when to use UUIDs over auto-increment IDs — with crypto.randomUUID() examples for Node.js and the browser.'
dateModified: '2026-06-01'
keyword: 'UUID JavaScript, UUID v4, GUID vs UUID, crypto.randomUUID, unique identifier JavaScript, UUID Node.js, UUID database primary key, UUID v7'
topic: 'Web Development'
faq:
  - question: "What is the difference between UUID v4 and UUID v7?"
    answer: "UUID v4 is 122 bits of pure randomness — no ordering information. UUID v7 encodes a millisecond-precision Unix timestamp in the first 48 bits, followed by 74 random bits. This makes v7 time-sortable: rows inserted later have lexicographically higher IDs, keeping B-tree indexes efficient. Use v4 for general identifiers; use v7 for database primary keys in write-heavy tables where index fragmentation matters."
  - question: "Should I use UUID or auto-increment integer for database primary keys?"
    answer: "Auto-increment is simpler and performs better in single-server setups. UUIDs are the right choice when IDs appear in URLs (to prevent count enumeration), when multiple services generate IDs independently, or when you need client-side ID generation. UUID v4 causes B-tree index fragmentation; UUID v7 closes that gap by embedding a timestamp that preserves insertion order."
  - question: "What is the difference between UUID and GUID?"
    answer: "They refer to the same thing. UUID (Universally Unique Identifier) is the ISO/IETF standard term from RFC 4122. GUID (Globally Unique Identifier) is Microsoft's term used in COM, .NET, and Windows APIs. Both follow the identical 8-4-4-4-12 hex format and are completely interchangeable. In JavaScript and web development, UUID is the conventional term."
  - question: "How do I generate a UUID in Node.js without a package?"
    answer: "Call crypto.randomUUID() — built into Node.js since version 14.17.0, no install needed. It generates a UUID v4 string like 'f47ac10b-58cc-4372-a567-0e02b2c3d479'. The same API is available in modern browsers. Only install the 'uuid' npm package if you specifically need v1, v5, or v7, which crypto.randomUUID() does not support."
  - question: "Is crypto.randomUUID() cryptographically secure?"
    answer: "Yes — it uses the operating system's CSPRNG, the same source as crypto.randomBytes(). The 122 random bits in UUID v4 make collisions negligible in practice. However, UUID v4 is an identifier, not a security token. For session tokens, API keys, and password reset links, use crypto.randomBytes(32).toString('hex') — it signals that the value is a secret, not a public ID."
---

A UUID (Universally Unique Identifier) is a 128-bit value formatted as 32 hex digits in five groups separated by hyphens: `550e8400-e29b-41d4-a716-446655440000`. UUID v4 fills 122 of those bits with cryptographic randomness — the remaining 6 bits encode the version and variant. You can generate one anywhere, at any time, without coordinating with a central server, and the collision probability is low enough to ignore in any practical system.

## The UUID Format

Every UUID follows the same structure:

```
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
              ↑    ↑
         version  variant
```

The `M` hex digit encodes the version. For UUID v4, it's always `4`. The `N` hex digit encodes the variant — the two most significant bits are `10` in binary for the RFC 4122 standard variant, giving values `8`, `9`, `a`, or `b`.

```
f47ac10b-58cc-4372-a567-0e02b2c3d479
              ↑    ↑
         version=4 variant=a (binary: 1010)
```

The 6 fixed bits leave 122 bits of randomness. With 2^122 possible values (~5.3 × 10^36), generating a billion UUIDs per second for a trillion years would not produce a collision.

## UUID Versions

Not all UUIDs are random. The version encodes how the ID was generated:

| Version | Basis | Use case |
|---------|-------|----------|
| v1 | Timestamp + MAC address | Legacy; leaks hardware identity — avoid |
| v3 | MD5 hash of namespace + name | Deterministic; MD5 is deprecated |
| **v4** | Random (CSPRNG) | Default choice for general identifiers |
| v5 | SHA-1 hash of namespace + name | Deterministic; same input → same UUID |
| **v7** | Unix timestamp (ms) + random | Database primary keys; time-sortable |

**v4** is what `crypto.randomUUID()` generates. It's the right choice for entity IDs, idempotency keys, and any identifier that doesn't need to encode ordering.

**v7** became the standard for database primary keys after RFC 9562 was published in 2024. The embedded millisecond timestamp keeps rows inserted in roughly chronological order, preventing the B-tree index fragmentation that pure-random v4 UUIDs cause in write-heavy tables.

## GUID vs UUID

GUID and UUID are the same thing with different names. UUID (Universally Unique Identifier) is the ISO/IETF standard term, defined in RFC 4122. GUID (Globally Unique Identifier) is Microsoft's terminology, introduced for COM component identification and still used throughout .NET and Windows APIs.

The format is identical — if a JavaScript app generates a UUID and a .NET service generates a GUID, they're the same data structure and can be compared directly. In web development, UUID is the standard term.

## Generating UUIDs in Node.js

`crypto.randomUUID()` is built into Node.js since version 14.17.0 — no package needed:

```js
import { randomUUID } from 'crypto';

const id = randomUUID();
console.log(id); // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

The `uuid` npm package is only needed for v1, v5, or v7:

```js
// npm install uuid
import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';

const randomId = uuidv4();    // equivalent to crypto.randomUUID()
const sortableId = uuidv7();  // time-sortable, better for DB primary keys
```

Use `crypto.randomUUID()` by default. Add the `uuid` package only if you specifically need v7 for database keys or v5 for deterministic name-based IDs.

## Generating UUIDs in the Browser

`crypto.randomUUID()` is available in all modern browsers (Chrome 92+, Firefox 95+, Safari 15.4+):

```js
// Browser — no import
const id = crypto.randomUUID();
console.log(id); // 'a3b4c5d6-...'
```

This means you can generate identifiers client-side before making a request to your API — useful for optimistic UI updates where you create the entity locally and sync it to the server asynchronously. The [UUID generator tool](/tools/uuid-generator) on this site uses `crypto.randomUUID()` exactly this way.

## UUID vs Auto-Increment IDs

Auto-increment integers are the default in most databases. They're simpler, use less storage (4–8 bytes vs 16 bytes for UUID), and generate a natural insertion order. UUIDs are the better choice in three specific situations:

**1. IDs appear in URLs or API responses.** An auto-increment ID in a URL (`/users/4231`) tells anyone how many records you have. UUID v4 is unguessable and reveals nothing about the dataset size.

**2. Distributed systems.** Auto-increment requires a centralized sequence generator. When multiple services or database shards write concurrently, they will generate duplicate integers. UUIDs can be generated anywhere without coordination.

**3. Client-generated IDs.** When a mobile app or browser creates an entity before the server confirms it (optimistic creation), auto-increment is impossible. UUIDs can be generated on the client and sent to the server.

For single-server, internal-only APIs where IDs are never exposed and distributed generation is not needed, auto-increment integers are simpler and perform better. The choice depends on architecture, not ideology.

## UUIDs as Database Primary Keys

Using UUID v4 as a primary key in a standard B-tree index causes index fragmentation. B-tree indexes work most efficiently when new entries are inserted near the end — auto-increment achieves this by definition. UUID v4 inserts at random positions throughout the index, forcing page splits and extra I/O on every write.

The practical fix: **UUID v7**. Its embedded millisecond timestamp means successive UUIDs are approximately ordered, and index fragmentation drops dramatically.

```js
import { v7 as uuidv7 } from 'uuid'; // npm install uuid

const id = uuidv7(); // '018f4e3c-1234-7abc-...' — time-sortable

// PostgreSQL (node-postgres)
await client.query(
  'INSERT INTO users (id, email) VALUES ($1, $2)',
  [id, email]
);
```

For PostgreSQL, use the native `uuid` column type (stored as 16 bytes). For MySQL, `CHAR(36)` stores the string representation; binary storage is more efficient if ID size matters.

## UUID as a Security Token

UUID v4 is **not** a security token. The 122 bits of randomness are sufficient to prevent guessing, but UUIDs are identifiers — public values safe to expose in URLs and API responses. For session tokens, password reset links, and API keys, use `crypto.randomBytes(32).toString('hex')`. This produces 256 bits of entropy and signals unambiguously that the value is a secret.

The distinction matters: if you use a UUID as a session token and log it (which you might, since it's "just an ID"), you've logged a secret. See [crypto vs Math.random in Node.js](/blogs/cryptographic-randomness-javascript) for the full picture on cryptographic randomness and when each approach applies.

When building REST APIs that use UUIDs as entity IDs, the [Node.js TypeScript REST API Guide](/blogs/nodejs-typescript-rest-api-production) covers how to type them correctly alongside Zod validation and typed route handlers.

## Frequently Asked Questions

**What is the difference between UUID v4 and UUID v7?**  
UUID v4 is 122 bits of pure randomness with no ordering. UUID v7 encodes a millisecond Unix timestamp in the first 48 bits followed by 74 random bits. This makes v7 time-sortable — rows inserted later have higher UUIDs, keeping B-tree indexes efficient. Use v4 for general identifiers; use v7 for database primary keys in write-heavy tables.

**Should I use UUID or auto-increment integer for database primary keys?**  
Auto-increment is simpler and performs better in single-server setups. Use UUIDs when IDs appear in URLs (to prevent count enumeration), when multiple services generate IDs independently, or when clients generate IDs before server confirmation. UUID v7 closes most of the performance gap by embedding a timestamp that preserves insertion order.

**What is the difference between UUID and GUID?**  
The same format with different names. UUID is the ISO/IETF standard term (RFC 4122). GUID is Microsoft's term used in COM, .NET, and Windows APIs. Both use the identical `8-4-4-4-12` hex format and are completely interchangeable.

**How do I generate a UUID in Node.js without a package?**  
Call `crypto.randomUUID()` — built into Node.js since 14.17.0, no install required. It generates a UUID v4. Only install the `uuid` package if you need v7 (time-sortable) or v5 (deterministic name-based).

**Is crypto.randomUUID() cryptographically secure?**  
Yes — it uses the OS CSPRNG, the same entropy source as `crypto.randomBytes()`. Collisions are negligible. However, UUID v4 is a public identifier, not a security token. For session tokens and API keys, use `crypto.randomBytes(32).toString('hex')` — it produces more entropy and signals that the value should be kept secret.
