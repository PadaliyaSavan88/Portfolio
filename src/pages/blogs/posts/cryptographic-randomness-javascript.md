---
title: 'Cryptographic Randomness in JavaScript'
date: '2026-05-10'
image: 'cryptography.png'
imageName: 'cryptography.png'
author: 'Savan Padaliya'
description: 'Math.random() is not secure for tokens or passwords. Learn how to use crypto.getRandomValues() and Node.js crypto for cryptographically secure randomness.'
keyword: 'crypto.getRandomValues JavaScript, Math.random vs crypto, secure random JavaScript, CSPRNG, cryptographic randomness, secure token generation, Node.js crypto module'
topic: 'Web Development'
faq:
  - question: "What is the difference between Math.random() and crypto.getRandomValues()?"
    answer: "Math.random() uses a pseudorandom number generator (PRNG) seeded with a predictable value — often the current timestamp. Given enough samples, an attacker can reconstruct the seed and predict all future values. crypto.getRandomValues() uses the operating system's cryptographically secure pseudorandom number generator (CSPRNG), which is seeded from unpredictable hardware entropy sources. The CSPRNG's internal state cannot be reconstructed from its outputs."
  - question: "How do I generate a secure random token in Node.js?"
    answer: "Use crypto.randomBytes(32).toString('hex') to generate a 64-character hex token, or crypto.randomBytes(32).toString('base64url') for a URL-safe base64 token. Both produce 256 bits of cryptographic entropy — sufficient for session tokens, API keys, password reset links, and CSRF tokens. Never use Math.random(), Date.now(), or any combination of them for security-sensitive tokens."
  - question: "When should I use crypto.randomUUID() vs crypto.randomBytes()?"
    answer: "Use crypto.randomUUID() when you specifically need a UUID v4 identifier — database primary keys, entity IDs, idempotency keys. Use crypto.randomBytes() when you need a token of a specific byte length or a specific encoding (hex, base64, base64url). Both use the CSPRNG. randomUUID() produces a fixed 122-bit random value in UUID format; randomBytes(n) gives you exactly n bytes of randomness to format however you need."
  - question: "Is Math.random() safe to use in a web application?"
    answer: "Math.random() is safe for non-security uses: generating random UI animations, shuffling a non-sensitive list, picking a random item from an array for display purposes, or seeding a non-security simulation. It is not safe for anything security-sensitive: tokens, IDs used in authorization, password generation, nonces, salts, or CSRF protection. The rule: if guessing the value would give an attacker an advantage, use crypto."
  - question: "How does a cryptographically secure pseudorandom number generator (CSPRNG) work?"
    answer: "A CSPRNG starts with a seed gathered from unpredictable hardware sources — CPU timing jitter, interrupt timing, mouse movement, disk I/O patterns. It feeds this entropy into a cryptographically strong algorithm (typically ChaCha20 or AES-CTR in counter mode) that produces a stream of output indistinguishable from true randomness. The key property is forward secrecy: even if an attacker captures the internal state at one point in time, they cannot compute past or future values."
---

`Math.random()` is fine for picking a random color or shuffling a UI element. It is not acceptable for generating session tokens, password reset links, API keys, or any value where predictability creates a security risk. This post explains why, shows you the correct APIs in both browser and Node.js, and covers every common use case where the distinction matters.

![Math.random() is not secure for tokens or passwords](cryptography.png)

## Why Math.random() Is Not Cryptographically Secure

`Math.random()` uses a pseudorandom number generator — an algorithm that produces a sequence of numbers that *looks* random but is entirely deterministic once you know the seed. V8 (the JavaScript engine) uses the xorshift128+ algorithm seeded with values derived from the current time and process state.

The practical security implication: given enough samples of `Math.random()` output, an attacker can reconstruct the internal state of the PRNG and predict all future values. Researchers have demonstrated this against real browser implementations.

Here is what this looks like in a real attack scenario:

1. Attacker requests 100 "forgot password" tokens from your API, each generated with `Math.random()`
2. Attacker reconstructs the PRNG seed from the outputs
3. Attacker predicts the token that was sent to a target user's email
4. Attacker resets the target user's password without ever accessing their email

This is not theoretical — it is a documented class of attack. PRNG state reconstruction takes milliseconds on modern hardware.

## How Cryptographic Randomness Works

A cryptographically secure pseudorandom number generator (CSPRNG) solves this with two properties:

**Unpredictable seeding.** The OS gathers entropy from hardware sources: CPU timing jitter, interrupt timing patterns, disk I/O timing, and on modern hardware, dedicated random number generator circuits (Intel RDRAND, ARM TRNG). This seed cannot be predicted or reproduced.

**Forward secrecy.** The CSPRNG's internal state is periodically refreshed with new entropy, and its state is designed so that observing outputs does not allow reconstruction of past or future outputs. Even if an attacker captures a snapshot of the CSPRNG state, they cannot compute values generated before or after that snapshot.

Both browser and Node.js expose this through standardized APIs.

## crypto.getRandomValues() in the Browser

The Web Cryptography API provides `crypto.getRandomValues()` for browser environments:

```js
// Generate 32 bytes of cryptographic randomness
const buffer = new Uint8Array(32);
crypto.getRandomValues(buffer);

// Convert to hex string (64 chars)
const hexToken = Array.from(buffer)
  .map(b => b.toString(16).padStart(2, '0'))
  .join('');

console.log(hexToken); // e.g., 'a3f2c1...' — 256 bits of entropy
```

For generating random integers in a range (e.g., for dice rolls or random sampling in client-side code):

```js
function randomInt(min, max) {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const buffer = new Uint8Array(bytesNeeded);
  let value;

  do {
    crypto.getRandomValues(buffer);
    value = buffer.reduce((acc, b) => (acc << 8) | b, 0);
  } while (value >= Math.floor((2 ** (bytesNeeded * 8)) / range) * range);

  return min + (value % range);
}
```

The rejection sampling loop ensures uniform distribution — without it, values near the upper bound are slightly more likely.

## Node.js crypto Module

Node.js provides the `crypto` module (built-in, no install required) with several relevant functions:

### crypto.randomBytes()

The foundation for token and key generation:

```js
import { randomBytes } from 'crypto';

// Generate a secure session token
const sessionToken = randomBytes(32).toString('hex'); // 64-char hex
const apiKey = randomBytes(32).toString('base64url'); // URL-safe base64

// Generate a fixed-length random ID
const shortId = randomBytes(12).toString('base64url'); // 16-char ID

console.log(sessionToken); // 'a3f2c1d4...' — 64 chars
console.log(apiKey);       // 'A3F2C1D4...' — ~43 chars
console.log(shortId);      // '...' — 16 chars
```

`base64url` uses `-` and `_` instead of `+` and `/`, and omits padding — safe to use directly in URLs and HTTP headers without encoding.

### crypto.randomUUID()

For UUID v4 identifiers:

```js
import { randomUUID } from 'crypto';

const id = randomUUID();
console.log(id); // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```

UUID v4 is 122 bits of randomness (4 bits are fixed for the version, 2 for the variant). It is appropriate for database primary keys, entity IDs, and idempotency keys. It is not appropriate as a security token — the UUID format is well-known and the fixed bits reduce entropy slightly.

### crypto.randomInt()

For a random integer in a range with cryptographic quality:

```js
import { randomInt } from 'crypto';

// Random integer between 0 (inclusive) and 100 (exclusive)
const roll = randomInt(100);

// Random integer between min (inclusive) and max (exclusive)
const pin = randomInt(100000, 999999);
```

Available in Node.js 14.10+. Internally handles the rejection sampling to ensure uniform distribution.

## Secure Token Generation Patterns

These patterns cover the most common security use cases:

```js
import { randomBytes, randomInt, timingSafeEqual } from 'crypto';

// Session token — store in httpOnly cookie
export function generateSessionToken() {
  return randomBytes(32).toString('base64url');
}

// Password reset token — store hash in DB, email raw token
export function generateResetToken() {
  const raw = randomBytes(32).toString('hex');
  const hash = createHash('sha256').update(raw).digest('hex');
  return { raw, hash };
}

// API key — prefix helps identify in logs without revealing key
export function generateApiKey(prefix = 'sk') {
  const secret = randomBytes(24).toString('base64url');
  return `${prefix}_${secret}`;
}

// OTP code (6-digit)
export function generateOTP() {
  return randomInt(100000, 999999).toString();
}

// CSRF token
export function generateCSRFToken() {
  return randomBytes(16).toString('hex');
}
```

For the password reset token pattern, storing the hash (not the raw token) in the database means that even if the database is compromised, the attacker cannot use the stored values to reset passwords — they need the raw tokens, which only exist in the emails.

## Comparing Tokens: timingSafeEqual

When verifying tokens, never use `===`. String comparison short-circuits on the first mismatch, leaking timing information that can reveal whether tokens share a common prefix:

```js
import { createHash, timingSafeEqual } from 'crypto';

function verifyToken(rawToken, storedHash) {
  const candidateHash = createHash('sha256')
    .update(rawToken)
    .digest();

  const expectedHash = Buffer.from(storedHash, 'hex');

  // Both buffers must be the same length for timingSafeEqual
  if (candidateHash.length !== expectedHash.length) return false;

  return timingSafeEqual(candidateHash, expectedHash);
}
```

Hashing both values before comparing also handles the case where one is undefined or null — the hash operation will throw rather than silently passing a comparison.

## Where This Matters in Practice

The boundary is clear: if guessing the value gives an attacker an advantage, use `crypto`. If it doesn't, `Math.random()` is fine.

| Use case | Use Math.random() | Use crypto |
|----------|-------------------|-----------|
| Random UI animation | ✓ | |
| Shuffle display list | ✓ | |
| Session token | | ✓ |
| Password reset link | | ✓ |
| API key | | ✓ |
| CSRF token | | ✓ |
| Email verification code | | ✓ |
| OTP | | ✓ |
| Database primary key | | ✓ (use randomUUID) |
| Test data generation | ✓ | |

The salt generation in bcrypt is the canonical example of where cryptographic randomness is non-negotiable. If the salt were predictable, rainbow table attacks would work despite the hashing — the attacker could precompute hashes for common passwords with the predictable salts. See [password hashing with bcrypt](/blogs/password-hashing-bcrypt-nodejs) for how `bcryptjs` handles this correctly. For the full picture of how this fits into authentication security, see [password security best practices for web developers](/blogs/password-security-best-practices-web-developers).

The [random string generator](/tools/random-string) on this site uses `crypto.getRandomValues()` for exactly this reason — every generated string is cryptographically random and safe for use as a token or API key.

## Frequently Asked Questions

**What is the difference between Math.random() and crypto.getRandomValues()?**  
`Math.random()` uses a seeded PRNG — given enough samples, an attacker can reconstruct the seed and predict all future values. `crypto.getRandomValues()` uses the operating system's CSPRNG, seeded from unpredictable hardware entropy. Its internal state cannot be reconstructed from outputs. Use `crypto` for anything security-sensitive.

**How do I generate a secure random token in Node.js?**  
Use `crypto.randomBytes(32).toString('hex')` for a 64-character hex token, or `crypto.randomBytes(32).toString('base64url')` for a URL-safe base64 token. Both give 256 bits of cryptographic entropy — sufficient for session tokens, API keys, password reset links, and CSRF tokens. Never use `Math.random()` or `Date.now()` for these.

**When should I use crypto.randomUUID() vs crypto.randomBytes()?**  
Use `crypto.randomUUID()` when you need a UUID v4 — database primary keys, entity IDs, idempotency keys. Use `crypto.randomBytes(n)` when you need a specific byte length or encoding (hex, base64url) for tokens and keys. Both use the CSPRNG. `randomUUID()` produces 122-bit random values in UUID format; `randomBytes(n)` gives exactly n bytes.

**Is Math.random() safe to use in a web application?**  
Safe for non-security purposes: random animations, shuffling display lists, picking random items for UI, seeding non-security simulations. Not safe for anything where predictability creates a security risk: tokens, authorization IDs, password generation, nonces, salts, CSRF protection. The rule: if guessing the value gives an attacker an advantage, use `crypto`.

**How does a cryptographically secure pseudorandom number generator (CSPRNG) work?**  
A CSPRNG is seeded from unpredictable hardware sources — CPU timing jitter, interrupt patterns, dedicated hardware RNG circuits. It feeds this entropy into a cryptographically strong algorithm like ChaCha20 or AES-CTR. The key property is forward secrecy: even if an attacker captures the CSPRNG state at one moment, they cannot compute past or future values. The state is periodically refreshed with new hardware entropy.
