import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

function generateString(length, charset) {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => charset[n % charset.length]).join('');
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Random String Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Generate cryptographically random strings using crypto.getRandomValues. Choose length and character sets for passwords, API keys, session tokens, and CSRF tokens.',
      url: 'https://www.savanpadaliya.com/tools/random-string',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://www.savanpadaliya.com' },
      featureList: ['Cryptographically secure via crypto.getRandomValues', 'Configurable length 8–128 characters', 'Uppercase, lowercase, numbers, symbols', 'One-click copy and regenerate'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What makes this random string generator cryptographically secure?', acceptedAnswer: { '@type': 'Answer', text: 'The tool uses crypto.getRandomValues(), which draws entropy from the operating system\'s hardware entropy pool. Unlike Math.random(), which is a deterministic algorithm, crypto.getRandomValues() is unpredictable even if an attacker knows previous outputs.' } },
        { '@type': 'Question', name: 'What should I use random strings for?', acceptedAnswer: { '@type': 'Answer', text: 'Session tokens, API keys, CSRF tokens, one-time passwords, unique file names, and any secret that must be unguessable by an attacker.' } },
        { '@type': 'Question', name: 'How long should my token be?', acceptedAnswer: { '@type': 'Answer', text: 'For session tokens and API keys, 32–64 characters from a mixed charset provides 190–380 bits of entropy — sufficient for any practical application. For one-time codes, 8–12 alphanumeric characters is typically enough.' } },
        { '@type': 'Question', name: 'Is Math.random() safe for generating tokens?', acceptedAnswer: { '@type': 'Answer', text: 'No. Math.random() uses a deterministic pseudorandom number generator that can potentially be predicted. Always use crypto.getRandomValues() (in the browser) or crypto.randomBytes() (in Node.js) for security-sensitive randomness.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What makes this cryptographically secure?', a: 'The tool uses crypto.getRandomValues(), which draws entropy from the operating system\'s hardware pool. Unlike Math.random(), it is unpredictable even if an attacker knows previous outputs — making it safe for secrets.' },
  { q: 'What should I use random strings for?', a: 'Session tokens, API keys, CSRF tokens, one-time passwords, unique file names, and any secret that must be unguessable.' },
  { q: 'How long should my token be?', a: 'For session tokens and API keys, 32–64 characters from a mixed charset provides 190–380 bits of entropy. For short one-time codes, 8–12 alphanumeric characters is typically sufficient.' },
  { q: 'Is Math.random() safe for tokens?', a: 'No. Math.random() is a deterministic algorithm that can potentially be predicted. Always use crypto.getRandomValues() (browser) or crypto.randomBytes() (Node.js) for security-sensitive randomness.' },
];

export default function RandomString() {
  const [length, setLength] = useState(32);
  const [options, setOptions] = useState({ uppercase: false, lowercase: true, numbers: true, symbols: false });
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [charsetError, setCharsetError] = useState('');

  function buildCharset() {
    return Object.entries(options).filter(([, v]) => v).map(([k]) => CHARSETS[k]).join('');
  }

  function generate() {
    const charset = buildCharset();
    if (!charset) { setCharsetError('Select at least one character set.'); return; }
    setCharsetError('');
    setResult(generateString(length, charset));
  }

  useEffect(() => { generate(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleLengthChange(val) { setLength(Math.min(128, Math.max(8, Number(val)))); }
  function toggleOption(key) { setOptions((prev) => ({ ...prev, [key]: !prev[key] })); setCharsetError(''); }
  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      <Head>
        <title>Random String Generator — Cryptographically Secure | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generate cryptographically random strings for passwords, API keys, and tokens. Choose length and character sets. Free, client-side, no sign-up." />
        <meta name="keywords" content="random string generator, cryptographic random, API key generator, secure token, crypto.getRandomValues" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://www.savanpadaliya.com/tools/random-string" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Random String Generator — Savan Padaliya" />
        <meta property="og:description" content="Generate cryptographically random strings. Choose length and character sets for passwords, API keys, or tokens." />
        <meta property="og:url" content="https://www.savanpadaliya.com/tools/random-string" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Random String Generator — Savan Padaliya" />
        <meta name="twitter:description" content="Generate cryptographically random strings for passwords, API keys, and tokens. Free, client-side." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Random String Generator</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Random String Generator</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Cryptographically random strings via <code>crypto.getRandomValues</code>. Use for passwords, API keys, or session tokens.</p>

            <div className="tool-card-ui">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="tool-label mb-0">Length</label>
                  <input type="number" min={8} max={128} value={length} onChange={(e) => handleLengthChange(e.target.value)}
                    style={{ width: 70, borderRadius: 6, border: '1px solid #d1d5db', padding: '0.25rem 0.5rem', textAlign: 'center', fontSize: '0.9rem' }} />
                </div>
                <input type="range" min={8} max={128} value={length} onChange={(e) => handleLengthChange(e.target.value)} className="form-range" />
              </div>
              <div className="mb-4">
                <p className="tool-label mb-2">Character sets</p>
                <div className="d-flex flex-wrap gap-3">
                  {[{ key: 'uppercase', label: 'Uppercase A–Z' }, { key: 'lowercase', label: 'Lowercase a–z' }, { key: 'numbers', label: 'Numbers 0–9' }, { key: 'symbols', label: 'Symbols !@#$%' }].map(({ key, label }) => (
                    <div key={key} className="form-check" style={{ minWidth: 160 }}>
                      <input className="form-check-input" type="checkbox" id={`charset-${key}`} checked={options[key]} onChange={() => toggleOption(key)} />
                      <label className="form-check-label" htmlFor={`charset-${key}`} style={{ fontSize: '0.9rem', color: '#374151' }}>{label}</label>
                    </div>
                  ))}
                </div>
                {charsetError && <p className="tool-error">{charsetError}</p>}
              </div>
              <button className="btn-primary-custom px-4 mb-4" onClick={generate}>Generate</button>
              {result && (
                <>
                  <div className="mb-3">
                    <p className="tool-label">Result</p>
                    <div className="tool-output-plain">{result}</div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn-primary-custom px-4" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
                    <button className="btn-outline-custom px-4" onClick={generate}>Regenerate</button>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.75rem' }}>{length} characters · {buildCharset().length || 0} possible characters</p>
                </>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Select your desired length (8–128) and which character sets to include — uppercase, lowercase, numbers, and symbols. Click Generate (or Regenerate) to produce a new string using crypto.getRandomValues(), the browser's cryptographically secure random number generator. Nothing leaves your browser."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/password-generator" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Password Generator</Link>
                <Link href="/tools/uuid-generator" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>UUID Generator</Link>
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
