import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import bcrypt from 'bcryptjs';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Bcrypt Hash Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Hash passwords with bcrypt or verify a password against a bcrypt hash. Free online tool — everything runs in your browser using bcryptjs, nothing is stored or transmitted.',
      url: 'https://savanpadaliya.com/tools/bcrypt-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Hash passwords with bcrypt (bcryptjs)', 'Verify password against existing hash', 'Cost rounds slider 4–14', 'Runs entirely in the browser — no data transmitted'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is bcrypt and why is it used for passwords?', acceptedAnswer: { '@type': 'Answer', text: 'bcrypt is a password hashing function designed by Niels Provos and David Mazières in 1999. Unlike MD5 or SHA-256, bcrypt is intentionally slow — its cost factor makes brute-force attacks computationally expensive. It also salts hashes automatically, making rainbow table attacks infeasible.' } },
        { '@type': 'Question', name: 'What is the bcrypt cost factor (rounds)?', acceptedAnswer: { '@type': 'Answer', text: 'The cost factor is an exponent: bcrypt performs 2^cost iterations of its key schedule. A cost of 10 means 1,024 iterations; cost 12 means 4,096 iterations. Higher cost = more computation time per hash. The OWASP recommendation as of 2023 is cost 10 as a minimum, with cost 12 preferred for new systems.' } },
        { '@type': 'Question', name: 'Can the same password produce different bcrypt hashes?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. bcrypt generates a random 128-bit salt for each hash operation and embeds the salt in the output string. This means the same password hashed twice will produce two different strings, both of which will verify correctly against the original password.' } },
        { '@type': 'Question', name: 'Is MD5 or SHA-1 safe for storing passwords?', acceptedAnswer: { '@type': 'Answer', text: 'No. MD5 and SHA-1 are general-purpose cryptographic hash functions designed to be fast. This speed makes them unsuitable for passwords — an attacker can hash billions of guesses per second using commodity hardware. Use bcrypt, scrypt, or Argon2 instead, which are designed to be slow and memory-hard.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is bcrypt and why is it used for passwords?', a: 'bcrypt is a password hashing function designed in 1999 to be intentionally slow. Its cost factor makes brute-force attacks computationally expensive. It also salts hashes automatically, making rainbow table attacks infeasible.' },
  { q: 'What is the bcrypt cost factor (rounds)?', a: 'The cost factor is an exponent: bcrypt performs 2^cost iterations. Cost 10 = 1,024 iterations; cost 12 = 4,096. The OWASP recommendation is cost 10 minimum, cost 12 preferred for new systems. Higher cost = slower hashing but better brute-force resistance.' },
  { q: 'Can the same password produce different bcrypt hashes?', a: 'Yes. bcrypt generates a random 128-bit salt per hash and embeds it in the output string. The same password hashed twice produces two different strings — both verify correctly against the original password.' },
  { q: 'Is MD5 or SHA-1 safe for storing passwords?', a: 'No. MD5 and SHA-1 are fast general-purpose hash functions — attackers can compute billions per second on commodity hardware. Use bcrypt, scrypt, or Argon2 instead; they are designed to be slow and memory-hard.' },
];

export default function BcryptGenerator() {
  const [mode, setMode] = useState('hash');
  const [password, setPassword] = useState('');
  const [rounds, setRounds] = useState(10);
  const [hashResult, setHashResult] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleHash() {
    if (!password) { setError('Enter a password to hash.'); return; }
    setError('');
    setLoading(true);
    setHashResult('');
    try {
      const hash = await bcrypt.hash(password, rounds);
      setHashResult(hash);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify() {
    if (!password || !verifyHash) { setError('Enter both a password and a hash.'); return; }
    setError('');
    setLoading(true);
    setVerifyResult(null);
    try {
      const match = await bcrypt.compare(password, verifyHash.trim());
      setVerifyResult(match);
    } catch (e) {
      setError('Invalid hash format. Make sure you paste a valid bcrypt hash.');
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(hashResult).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  function switchMode(m) {
    setMode(m);
    setPassword('');
    setHashResult('');
    setVerifyHash('');
    setVerifyResult(null);
    setError('');
  }

  return (
    <>
      <Head>
        <title>Bcrypt Generator Online — Hash & Verify | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Free online bcrypt generator — hash any password with custom cost rounds or verify a bcrypt hash instantly. Runs in your browser, nothing stored." />
        <meta name="keywords" content="bcrypt online, bcrypt generator, bcrypt hash online, online bcrypt, bcrypt hash generator, bcrypt verifier, hash password online, bcryptjs online, password hash, online bcrypt generator" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/bcrypt-generator" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bcrypt Generator Online — Hash & Verify | Savan Padaliya" />
        <meta property="og:description" content="Free online bcrypt generator — hash any password with custom cost rounds or verify a bcrypt hash instantly. Runs in your browser, nothing stored." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/bcrypt-generator" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Bcrypt Hash Generator / Verifier — Savan Padaliya" />
        <meta name="twitter:description" content="Hash passwords with bcrypt or verify against a hash. Runs in your browser. Free, no sign-up." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Bcrypt Hash</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Bcrypt Hash Generator</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Hash passwords or verify them against a bcrypt hash. Runs entirely in your browser.</p>

            <div className="tool-card-ui mt-4">
              <div className="d-flex gap-2 mb-4">
                {[['hash', 'Hash Password'], ['verify', 'Verify Password']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => switchMode(val)}
                    style={{
                      padding: '0.5rem 1.25rem', borderRadius: 6, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                      background: mode === val ? '#3081D0' : '#fff',
                      color: mode === val ? '#fff' : '#374151',
                      border: `1px solid ${mode === val ? '#3081D0' : '#d1d5db'}`,
                    }}
                  >{label}</button>
                ))}
              </div>

              <div className="mb-3">
                <label className="tool-label mb-2 d-block">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); setVerifyResult(null); }}
                  placeholder="Enter password..."
                  style={{ borderRadius: 8, fontSize: '0.95rem' }}
                />
              </div>

              {mode === 'hash' && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="tool-label mb-0">Cost rounds: <strong>{rounds}</strong></label>
                    {rounds >= 13 && (
                      <span style={{ fontSize: '0.75rem', color: '#f97316', fontWeight: 600 }}>⚠ May take several seconds</span>
                    )}
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={14}
                    value={rounds}
                    onChange={(e) => setRounds(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#3081D0' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>
                    <span>4 (fast)</span><span>14 (very slow)</span>
                  </div>
                </div>
              )}

              {mode === 'verify' && (
                <div className="mb-4">
                  <label className="tool-label mb-2 d-block">Bcrypt hash</label>
                  <input
                    className="form-control"
                    value={verifyHash}
                    onChange={(e) => { setVerifyHash(e.target.value); setVerifyResult(null); setError(''); }}
                    placeholder="$2a$10$..."
                    style={{ fontFamily: "'Courier New', monospace", fontSize: '0.85rem', borderRadius: 8 }}
                  />
                </div>
              )}

              {error && <p className="tool-error mb-3">✗ {error}</p>}

              <div className="d-flex gap-2 mb-4">
                <button className="btn-primary-custom px-4" onClick={mode === 'hash' ? handleHash : handleVerify} disabled={loading}>
                  {loading ? 'Processing…' : mode === 'hash' ? 'Hash' : 'Verify'}
                </button>
              </div>

              {mode === 'hash' && hashResult && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="tool-label mb-0">Hash result</p>
                    <button className="btn-outline-custom px-3 py-1" style={{ fontSize: '0.8rem' }} onClick={handleCopy}>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.85rem',
                    background: '#1e1e1e',
                    color: '#d4d4d4',
                    borderRadius: 8,
                    padding: '1rem 1.25rem',
                    wordBreak: 'break-all',
                  }}>
                    {hashResult}
                  </div>
                </div>
              )}

              {mode === 'verify' && verifyResult !== null && (
                <div style={{
                  padding: '1rem 1.25rem',
                  borderRadius: 8,
                  background: verifyResult ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${verifyResult ? '#bbf7d0' : '#fecaca'}`,
                  fontWeight: 700,
                  color: verifyResult ? '#166534' : '#991b1b',
                  fontSize: '1rem',
                }}>
                  {verifyResult ? '✓ Password matches the hash' : '✗ Password does not match the hash'}
                </div>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Select Hash Password or Verify Password mode. In Hash mode, enter a password, set the cost rounds (4–14; OWASP recommends 10–12), and click Hash. The tool calls bcrypt.hash() from the bcryptjs library entirely in your browser — no data is sent to any server. The resulting hash embeds the salt and cost factor so it can be stored directly in a database. In Verify mode, enter the original password and the stored bcrypt hash and click Verify to confirm whether they match."
              faqs={FAQS}
            />

            <div className="tool-more-section" style={{ marginBottom: '1.5rem' }}>
              <p className="tool-more-title" style={{ marginBottom: '0.5rem' }}>Want the full picture?</p>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                Learn how bcrypt works under the hood — cost factors, salt generation, timing-safe comparison, and the auth mistakes that leave users exposed.
              </p>
              <Link href="/blogs/password-hashing-bcrypt-nodejs" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>
                Read: Password Hashing with Bcrypt in Node.js →
              </Link>
            </div>

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/password-generator" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Password Generator</Link>
                <Link href="/tools/random-string" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Random String</Link>
                <Link href="/tools" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>All Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
