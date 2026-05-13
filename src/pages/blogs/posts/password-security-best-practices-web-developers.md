---
title: 'Password Security for Web Developers'
date: '2026-05-04'
image: ''
imageName: ''
author: 'Savan Padaliya'
description: 'OWASP-aligned password security for web developers — hashing, storage, reset flows, timing attacks, and the mistakes that leave your users vulnerable.'
keyword: 'password security web development, secure password storage, OWASP passwords, password best practices, authentication security, credential stuffing, password reset flow'
topic: 'Web Development'
faq:
  - question: "What is the most secure way to store passwords in a web application?"
    answer: "Hash passwords with bcrypt, scrypt, or Argon2id before storing — never store plaintext or reversibly encrypted passwords. Use bcrypt at cost 12 or Argon2id with OWASP-recommended parameters. Each password gets a unique salt (handled automatically by bcrypt), so identical passwords produce different hashes. Never use MD5, SHA-1, or SHA-256 for passwords — they are too fast to resist GPU brute-force attacks."
  - question: "How do I implement a secure password reset flow?"
    answer: "Generate a cryptographically random token (at least 32 bytes via crypto.randomBytes) and store its hash in the database alongside an expiry timestamp of 15–60 minutes. Email the raw token to the user. On reset, verify the token matches its stored hash, check the expiry, invalidate the token immediately, and hash the new password before saving. Never put only the user ID in a reset URL — always require the random token."
  - question: "What is credential stuffing and how do I protect against it?"
    answer: "Credential stuffing is an automated attack where attackers use leaked username and password pairs from data breaches to log into other services, exploiting users who reuse passwords. Protect with rate limiting on login endpoints, account lockout after repeated failures, breach password detection via the HaveIBeenPwned API, and multi-factor authentication for sensitive accounts."
  - question: "Should I enforce password complexity rules or just minimum length?"
    answer: "NIST SP 800-63B recommends minimum length — at least 12 characters — over complexity rules. Complexity requirements push users toward predictable patterns like 'Password1!' that are easily guessed. Minimum length combined with a breach check is more effective. Allow all printable Unicode characters, reject passwords found in breach databases, and show a strength meter without forcing specific character types."
  - question: "What is the difference between authentication and authorization?"
    answer: "Authentication verifies identity — who you are. Authorization verifies permissions — what you are allowed to do. A user logs in successfully (authentication) but may only access their own data, not another user's (authorization). In code, authentication happens at the login endpoint; authorization runs as middleware on every protected route, checking whether the authenticated user has the right role or ownership to perform the action."
---

Password security failures are responsible for a large share of web application breaches — not because hashing algorithms are broken, but because developers make avoidable implementation mistakes. This post covers the OWASP-aligned practices every web developer should follow: how to store passwords correctly, how to build a secure reset flow, and how to defend against the attacks that actually happen in production.

## The Foundation: Never Store Plaintext or Reversible Passwords

Storing passwords in plaintext is an obvious mistake, but reversible encryption is just as dangerous. An encrypted password can be decrypted if an attacker gets the encryption key — and in a database breach, they often can. The correct approach is a one-way adaptive hash function designed specifically for passwords.

Three algorithms meet that standard today:

| Algorithm | Memory-hard | OWASP recommendation | Node.js package |
|-----------|-------------|---------------------|-----------------|
| bcrypt | No | Minimum cost 10, prefer 12 | `bcryptjs` |
| scrypt | Yes | N=32768, r=8, p=1 | Built-in `crypto` module |
| Argon2id | Yes | Top recommendation for new systems | `argon2` |

For most Node.js applications, bcrypt is the pragmatic choice — well-supported, battle-tested for 25 years, and available as a pure-JavaScript library with no native compilation. See the dedicated guide on [password hashing with bcrypt](/blogs/password-hashing-bcrypt-nodejs) for implementation details including cost factor selection, timing-safe comparison, and the Express auth flow pattern.

## How Adaptive Hashing Protects You

The key property of password hashing algorithms is that they are intentionally slow. bcrypt at cost 12 takes 200–400ms per hash. SHA-256 takes microseconds.

If an attacker steals your hashed password database and tries to crack it with GPU hardware:

- SHA-256: ~10 billion guesses per second
- bcrypt cost 12: ~3–5 guesses per second per GPU

The difference is the entire security margin. Adaptive hashing keeps brute-force attacks computationally infeasible even as hardware improves — you raise the cost factor to compensate.

## Timing-Safe Password Verification

Never use `===` to compare passwords or hashes. String comparison in JavaScript short-circuits — it stops as soon as it finds a mismatch. An attacker can measure how long a comparison takes and use the timing difference to infer information about the stored hash.

Always use a constant-time comparison function:

```js
import bcrypt from 'bcryptjs';

// Always compare with bcrypt.compare() — never ===
const isValid = await bcrypt.compare(candidatePassword, storedHash);
```

The same principle applies to session tokens and API keys. Node.js provides `crypto.timingSafeEqual()` for comparing raw buffers:

```js
import { timingSafeEqual, createHash } from 'crypto';

function safeCompare(a, b) {
  const hashA = createHash('sha256').update(a).digest();
  const hashB = createHash('sha256').update(b).digest();
  return timingSafeEqual(hashA, hashB);
}
```

Hashing both values before comparing ensures they're always the same byte length — `timingSafeEqual` requires equal-length buffers.

## Secure Password Reset Flows

Password reset is one of the most commonly broken auth flows. The correct pattern:

**1. Request reset**

```js
import { randomBytes, createHash } from 'crypto';

async function requestPasswordReset(email) {
  const user = await db.users.findOne({ email });
  if (!user) return; // Don't reveal whether email exists

  const rawToken = randomBytes(32).toString('hex');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

  await db.resetTokens.create({
    userId: user.id,
    tokenHash,
    expiresAt,
    used: false,
  });

  await sendEmail(email, `https://yourapp.com/reset?token=${rawToken}`);
}
```

Store the hash, email the raw token. If the database is breached, the stored hashes are useless without the originals.

**2. Verify and reset**

```js
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

async function resetPassword(rawToken, newPassword) {
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');

  const record = await db.resetTokens.findOne({
    tokenHash,
    used: false,
    expiresAt: { $gt: new Date() },
  });

  if (!record) throw new Error('Invalid or expired token');

  await db.resetTokens.update({ id: record.id }, { used: true });

  const newHash = await bcrypt.hash(newPassword, 12);
  await db.users.update({ id: record.userId }, { password: newHash });

  // Invalidate all existing sessions for this user
  await db.sessions.deleteMany({ userId: record.userId });
}
```

Mark the token as used immediately after validation — before saving the new password — so it cannot be replayed even if the update fails and retried.

## Rate Limiting and Account Lockout

Without rate limiting, a login endpoint is an open brute-force target. Apply limits at two levels:

**Per-IP rate limit** (using `express-rate-limit`):

```js
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per IP per window
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
  standardHeaders: true,
});

app.post('/login', loginLimiter, loginHandler);
```

**Progressive delay** after failed attempts on a specific account:

```js
async function loginHandler(req, res) {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });

  // Exponential backoff: 2^failedAttempts seconds
  if (user && user.failedAttempts > 3) {
    const lockUntil = new Date(user.lastFailedAt.getTime() + Math.pow(2, user.failedAttempts) * 1000);
    if (new Date() < lockUntil) {
      return res.status(429).json({ error: 'Account temporarily locked.' });
    }
  }

  const dummyHash = '$2b$12$invalidpadding0000000000000000000000000000000000000000000';
  const hash = user?.password ?? dummyHash;
  const isValid = await bcrypt.compare(password, hash);

  if (!user || !isValid) {
    if (user) await db.users.update({ id: user.id }, { failedAttempts: user.failedAttempts + 1, lastFailedAt: new Date() });
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  await db.users.update({ id: user.id }, { failedAttempts: 0 });
  // Issue session or JWT
}
```

The dummy hash comparison in the not-found path is critical — without it, the response time difference between "user not found" and "wrong password" leaks which email addresses are registered.

## Defending Against Credential Stuffing

Credential stuffing attacks replay breached username/password combinations across services. Users who reuse passwords are the target. Your defense layers:

**1. Breach password detection** — check new passwords and logins against known breached credentials:

```js
import { pwnedPassword } from 'hibp';

async function checkBreachedPassword(password) {
  const count = await pwnedPassword(password);
  if (count > 0) {
    throw new Error(`This password has appeared in ${count} data breaches. Choose a different one.`);
  }
}
```

The `hibp` library uses the k-anonymity API — only the first 5 characters of the SHA-1 hash are sent, so your user's actual password is never transmitted.

**2. Device fingerprinting and anomaly detection** — flag logins from unusual locations or devices that succeed after previously failing from many IPs.

**3. MFA** — multi-factor authentication makes stolen passwords insufficient on their own.

## Password Policy: What NIST Actually Recommends

NIST SP 800-63B (most recent revision) changed the guidance significantly:

| Old guidance | Current NIST guidance |
|---|---|
| Require uppercase, numbers, symbols | Do NOT require specific character types |
| Force periodic password resets | Only reset on evidence of compromise |
| Maximum 72 characters | Minimum 15 characters, support up to 64+ |
| Security questions | Do NOT use knowledge-based authentication |
| Complexity meters | Show strength meter without blocking submission |

The key insight is that complexity requirements make passwords harder for users but not harder for attackers — they produce predictable substitutions like `@` for `a` and `3` for `e`. Length is the actual security property.

## Generating Secure Passwords for Users

When generating temporary passwords or tokens for users, always use cryptographic randomness — never `Math.random()`. The [random string generator](/tools/random-string) uses `crypto.getRandomValues()` for exactly this reason. For the technical details behind why `Math.random()` is insecure for security applications, see the guide on [cryptographic randomness in JavaScript](/blogs/cryptographic-randomness-javascript).

The [password generator](/tools/password-generator) generates strong, cryptographically random passwords with a real-time strength meter — useful for testing your validation logic and demonstrating good password choices to users.

## Frequently Asked Questions

**What is the most secure way to store passwords in a web application?**  
Hash passwords with bcrypt, scrypt, or Argon2id before storing — never plaintext or reversible encryption. Use bcrypt at cost 12 or Argon2id with OWASP parameters. Each password gets a unique salt automatically. Never use MD5, SHA-1, or SHA-256 — they are far too fast for password hashing and trivially cracked with GPU hardware.

**How do I implement a secure password reset flow?**  
Generate a 32-byte cryptographically random token with `crypto.randomBytes`. Store its SHA-256 hash in the database with a 30-minute expiry. Email the raw token to the user. On reset, verify the token hash matches, check expiry, mark it used immediately, hash the new password with bcrypt, and invalidate all existing sessions for the user.

**What is credential stuffing and how do I protect against it?**  
Credential stuffing replays leaked username/password pairs from data breaches. Defend with rate limiting on login endpoints, progressive lockout after repeated failures, HaveIBeenPwned breach detection on new passwords, and multi-factor authentication. Consider anomaly detection for logins from unusual devices or locations.

**Should I enforce password complexity rules or just minimum length?**  
NIST SP 800-63B recommends minimum length — at least 12 to 15 characters — over complexity rules. Complexity requirements produce predictable patterns that are easily guessed. Minimum length with breach detection is more effective. Show a strength meter, but do not block submission based on character type requirements alone.

**What is the difference between authentication and authorization?**  
Authentication verifies identity — confirming who the user is at login. Authorization verifies permissions — confirming what that user is allowed to do on each request. In a Node.js API: authentication runs once at login and issues a session or JWT; authorization runs as middleware on every protected route, checking whether the authenticated user has the appropriate role or resource ownership.
