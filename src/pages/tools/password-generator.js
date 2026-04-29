import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};
const AMBIGUOUS = /[0Ol1I]/g;

function generatePassword(length, opts) {
  let charset = '';
  if (opts.upper) charset += CHARSETS.upper;
  if (opts.lower) charset += CHARSETS.lower;
  if (opts.numbers) charset += CHARSETS.numbers;
  if (opts.symbols) charset += CHARSETS.symbols;
  if (opts.noAmbiguous) charset = charset.replace(AMBIGUOUS, '');
  if (!charset) return '';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => charset[n % charset.length]).join('');
}

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 10) score++;
  if (pwd.length >= 14) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const STRENGTH_LABELS = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
const STRENGTH_COLORS = ['', '#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#16a34a'];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Password Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Generate strong, cryptographically random passwords with a built-in strength meter. Choose length (8–64) and character sets. Everything runs in your browser — nothing is stored.',
      url: 'https://savanpadaliya.com/tools/password-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Cryptographically secure via crypto.getRandomValues', 'Length slider 8–64 characters', 'Uppercase, lowercase, numbers, symbols', 'Exclude ambiguous characters (0, O, l, I, 1)', 'Real-time strength meter'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long should a strong password be?', acceptedAnswer: { '@type': 'Answer', text: 'Security researchers generally recommend at least 12 characters for personal accounts and 16 or more for sensitive or shared accounts. A 16-character mixed-case password with numbers and symbols provides over 100 bits of entropy, making brute-force attacks computationally infeasible.' } },
        { '@type': 'Question', name: 'Why exclude ambiguous characters from a password?', acceptedAnswer: { '@type': 'Answer', text: 'Characters like 0 (zero), O (uppercase o), l (lowercase L), I (uppercase i), and 1 (one) look nearly identical in many fonts. Excluding them reduces transcription errors when you need to type a password manually — for example into a TV or device that cannot paste.' } },
        { '@type': 'Question', name: 'Is this password generator cryptographically secure?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool uses crypto.getRandomValues(), which draws entropy from the operating system\'s hardware entropy pool. Unlike Math.random(), which is a deterministic algorithm, crypto.getRandomValues() is unpredictable and suitable for generating secrets.' } },
        { '@type': 'Question', name: 'How is password strength calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Strength is scored on six criteria: length ≥ 10, length ≥ 14, contains uppercase, contains lowercase, contains digits, and contains symbols. Each satisfied criterion adds one point. Six points = Very Strong; zero = Very Weak.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'How long should a strong password be?', a: 'At least 12 characters for personal accounts and 16 or more for sensitive accounts. A 16-character mixed-case password with numbers and symbols provides over 100 bits of entropy, making brute-force attacks infeasible.' },
  { q: 'Why exclude ambiguous characters?', a: 'Characters like 0, O, l, I, and 1 look nearly identical in many fonts. Excluding them prevents transcription errors when typing a password manually — for example into a TV or a device that cannot paste from clipboard.' },
  { q: 'Is this generator cryptographically secure?', a: "Yes. The tool uses crypto.getRandomValues(), which draws entropy from the OS hardware pool. Unlike Math.random(), which is deterministic, crypto.getRandomValues() is unpredictable and safe for generating secrets." },
  { q: 'How is password strength calculated?', a: 'Strength is scored on 6 criteria: length ≥ 10, length ≥ 14, contains uppercase, lowercase, digits, and symbols. Each adds one point. 6 = Very Strong, 0 = Very Weak.' },
];

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: false, noAmbiguous: false });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [charsetError, setCharsetError] = useState(false);

  const generate = useCallback(() => {
    const anySelected = opts.upper || opts.lower || opts.numbers || opts.symbols;
    if (!anySelected) { setCharsetError(true); return; }
    setCharsetError(false);
    setPassword(generatePassword(length, opts));
  }, [length, opts]);

  useEffect(() => { generate(); }, [generate]);

  function handleCopy() {
    navigator.clipboard.writeText(password).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const strength = password ? getStrength(password) : 0;

  return (
    <>
      <Head>
        <title>Password Generator — Strong Random Passwords | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generate strong, random passwords with a built-in strength meter. Choose length and character sets. Everything runs in your browser — nothing is stored." />
        <meta name="keywords" content="password generator, strong password, random password, secure password, online password generator" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/password-generator" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Password Generator — Strong Random Passwords | Savan Padaliya" />
        <meta property="og:description" content="Cryptographically secure password generator with strength meter. Choose length and character sets. Free, runs in browser." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/password-generator" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Password Generator — Strong Random Passwords | Savan Padaliya" />
        <meta name="twitter:description" content="Cryptographically secure password generator with strength meter. Free, runs in your browser." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Password Generator</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Password Generator</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Cryptographically random passwords. Everything runs in your browser — nothing is sent or stored.</p>

            <div className="tool-card-ui mt-4">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="tool-label mb-0">Length</label>
                  <span style={{ fontWeight: 700, color: '#3081D0', minWidth: 32, textAlign: 'right' }}>{length}</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={64}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#3081D0' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>
                  <span>8</span><span>64</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="tool-label mb-3 d-block">Character sets</label>
                <div className="row g-2">
                  {[
                    ['upper', 'Uppercase A–Z'],
                    ['lower', 'Lowercase a–z'],
                    ['numbers', 'Numbers 0–9'],
                    ['symbols', 'Symbols !@#$%…'],
                    ['noAmbiguous', 'Exclude ambiguous (0,O,l,I,1)'],
                  ].map(([key, label]) => (
                    <div key={key} className="col-12">
                      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>
                        <input
                          type="checkbox"
                          checked={opts[key]}
                          onChange={(e) => setOpts((prev) => ({ ...prev, [key]: e.target.checked }))}
                          style={{ accentColor: '#3081D0', width: 16, height: 16 }}
                        />
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
                {charsetError && <p className="tool-error mt-2">Select at least one character set.</p>}
              </div>

              {password && (
                <div className="mb-4">
                  <label className="tool-label mb-2 d-block">Generated password</label>
                  <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: '1.1rem',
                    background: '#1e1e1e',
                    color: '#d4d4d4',
                    borderRadius: 8,
                    padding: '1rem 1.25rem',
                    wordBreak: 'break-all',
                    letterSpacing: '0.05em',
                  }}>
                    {password}
                  </div>

                  <div className="mt-3 mb-2">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                      <span style={{ color: '#6b7280' }}>Strength</span>
                      <span style={{ fontWeight: 700, color: STRENGTH_COLORS[strength] }}>{STRENGTH_LABELS[strength]}</span>
                    </div>
                    <div style={{ height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(strength / 6) * 100}%`, background: STRENGTH_COLORS[strength], borderRadius: 3, transition: 'width 0.3s, background 0.3s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex gap-2">
                <button className="btn-primary-custom px-4" onClick={generate}>Generate</button>
                <button className="btn-outline-custom px-4" onClick={handleCopy} disabled={!password}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Adjust the length slider (8–64 characters) and select which character sets to include: uppercase A–Z, lowercase a–z, numbers 0–9, and symbols. Optionally enable 'Exclude ambiguous' to remove characters like 0, O, l, I, and 1 that are hard to distinguish visually. The tool auto-generates a new password whenever any option changes, using crypto.getRandomValues() for cryptographic randomness. The strength meter scores the password on 6 criteria. Nothing is sent to any server."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/random-string" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Random String</Link>
                <Link href="/tools/bcrypt-generator" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Bcrypt Hash</Link>
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
