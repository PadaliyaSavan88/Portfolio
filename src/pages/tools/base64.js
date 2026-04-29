import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

function encode(str) { try { return btoa(unescape(encodeURIComponent(str))); } catch { return null; } }
function decode(b64) { try { return decodeURIComponent(escape(atob(b64.trim()))); } catch { return null; } }

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Base64 Encoder / Decoder',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online Base64 encoder and decoder. Encode plain text or Unicode to Base64, or decode Base64 strings back to readable text. Runs entirely in your browser.',
      url: 'https://savanpadaliya.com/tools/base64',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Encode plain text to Base64', 'Decode Base64 to plain text', 'Full Unicode support', 'Instant client-side processing'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is Base64 encoding?', acceptedAnswer: { '@type': 'Answer', text: 'Base64 is a binary-to-text encoding scheme that converts arbitrary bytes into a safe ASCII character set (A–Z, a–z, 0–9, +, /). It is used to embed binary data in JSON, HTML, email, and HTTP headers where only text is allowed.' } },
        { '@type': 'Question', name: 'When should I use Base64?', acceptedAnswer: { '@type': 'Answer', text: 'Use Base64 when embedding binary data (images, files, keys) in JSON payloads, sending binary in email attachments (MIME), encoding values in JWTs, or creating data URIs for inline images in HTML/CSS.' } },
        { '@type': 'Question', name: 'Does Base64 compress data?', acceptedAnswer: { '@type': 'Answer', text: 'No — Base64 increases the size of data by approximately 33%. It is an encoding scheme, not compression. Use gzip or brotli if you need to reduce size.' } },
        { '@type': 'Question', name: 'Is Base64 encryption?', acceptedAnswer: { '@type': 'Answer', text: 'No. Base64 is easily reversible and provides zero security. Anyone with the encoded string can decode it instantly. Use proper encryption (AES, RSA) or hashing (bcrypt) for security purposes.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is Base64 encoding?', a: 'Base64 converts arbitrary bytes into a safe ASCII character set (A–Z, a–z, 0–9, +, /). It is used to embed binary data in JSON, HTML, email, and HTTP headers where only plain text is allowed.' },
  { q: 'When should I use Base64?', a: 'When embedding binary data (images, files, cryptographic keys) in JSON payloads, encoding JWT payloads, creating data URIs for inline images, or sending attachments via email (MIME encoding).' },
  { q: 'Does Base64 compress data?', a: 'No — Base64 increases data size by approximately 33%. It is an encoding scheme, not a compression algorithm. Use gzip or brotli for size reduction.' },
  { q: 'Is Base64 secure?', a: 'No. Base64 is trivially reversible and provides no security whatsoever. It is encoding, not encryption. Use AES or RSA for encryption, and bcrypt/argon2 for password hashing.' },
];

export default function Base64Tool() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function handleConvert() {
    if (!input.trim()) { setError('Paste some content first.'); return; }
    if (mode === 'encode') {
      const result = encode(input);
      if (result === null) { setError('Could not encode input.'); setOutput(''); }
      else { setOutput(result); setError(''); }
    } else {
      const result = decode(input);
      if (result === null) { setError('Invalid Base64 input. Make sure there are no extra spaces or invalid characters.'); setOutput(''); }
      else { setOutput(result); setError(''); }
    }
  }

  function handleCopy() { navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }
  function handleModeSwitch(m) { setMode(m); setInput(''); setOutput(''); setError(''); }
  function loadSample() { setInput(mode === 'encode' ? 'Hello, World! 🌍' : 'SGVsbG8sIFdvcmxkISDwn4yN'); setOutput(''); setError(''); }

  return (
    <>
      <Head>
        <title>Base64 Encoder / Decoder — Free Online Tool | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Free online Base64 encoder and decoder. Paste plain text to encode or Base64 to decode. Supports Unicode. No sign-up required." />
        <meta name="keywords" content="base64 encoder, base64 decoder, base64 online, encode base64, decode base64, btoa atob" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/base64" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Base64 Encoder / Decoder — Savan Padaliya" />
        <meta property="og:description" content="Encode plain text to Base64 or decode Base64 back to text. Supports Unicode. Free, instant, no sign-up." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/base64" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Base64 Encoder / Decoder — Savan Padaliya" />
        <meta name="twitter:description" content="Encode plain text to Base64 or decode Base64 back to text. Supports Unicode. Free and instant." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Base64 Encoder</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Base64 Encoder / Decoder</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Encode plain text to Base64 or decode Base64 back to text. Supports Unicode.</p>

            <div className="tool-card-ui">
              <div className="d-flex gap-2 mb-4">
                {[['encode', 'Encode'], ['decode', 'Decode']].map(([val, label]) => (
                  <button key={val} onClick={() => handleModeSwitch(val)} style={{ padding: '0.5rem 1.25rem', borderRadius: 6, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', background: mode === val ? '#3081D0' : '#fff', color: mode === val ? '#fff' : '#374151', border: `1px solid ${mode === val ? '#3081D0' : '#d1d5db'}` }}>{label}</button>
                ))}
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="tool-label mb-0">Input ({mode === 'encode' ? 'plain text' : 'Base64'})</label>
                  <button onClick={loadSample} style={{ fontSize: '0.78rem', color: '#3081D0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Load sample</button>
                </div>
                <textarea className="form-control" rows={6} value={input} onChange={(e) => { setInput(e.target.value); setError(''); }} placeholder={mode === 'encode' ? 'Hello, World!' : 'SGVsbG8sIFdvcmxkIQ=='} style={{ fontFamily: "'Courier New', monospace", fontSize: '0.875rem', borderRadius: 8, resize: 'vertical' }} />
              </div>
              <div className="d-flex gap-2 mb-3">
                <button className="btn-primary-custom px-4" onClick={handleConvert}>{mode === 'encode' ? 'Encode' : 'Decode'}</button>
                <button onClick={() => { setInput(''); setOutput(''); setError(''); }} style={{ background: 'none', border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem 1.25rem', color: '#6b7280', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>Clear</button>
              </div>
              {error && <p className="tool-error">✗ {error}</p>}
              {output && (
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="tool-label mb-0">Output</p>
                    <button className="btn-outline-custom px-3 py-1" style={{ fontSize: '0.8rem' }} onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
                  </div>
                  <textarea className="form-control" rows={6} readOnly value={output} style={{ fontFamily: "'Courier New', monospace", fontSize: '0.875rem', borderRadius: 8, background: '#f8f9fa' }} />
                </div>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Select Encode or Decode mode. In Encode mode, paste any plain text (including Unicode and emoji) and click Encode — the tool uses btoa() with URI encoding to handle the full Unicode range. In Decode mode, paste a Base64 string and click Decode to recover the original text. The tool uses atob() with URI decoding for Unicode support. Nothing leaves your browser."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/json-formatter" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>JSON Formatter</Link>
                <Link href="/tools/case-converter" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Case Converter</Link>
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
