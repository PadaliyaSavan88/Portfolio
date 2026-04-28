import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

function generateUUID(uppercase, noDashes) {
  let uuid = crypto.randomUUID();
  if (noDashes) uuid = uuid.replace(/-/g, '');
  if (uppercase) uuid = uuid.toUpperCase();
  return uuid;
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'UUID / GUID Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Generate one or many UUID v4 identifiers instantly. Options for uppercase, no dashes, and bulk generation up to 20 at once. No sign-up required.',
      url: 'https://www.savanpadaliya.com/tools/uuid-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://www.savanpadaliya.com' },
      featureList: ['UUID v4 generation via crypto.randomUUID()', 'Bulk generation up to 20 UUIDs', 'Uppercase and no-dashes variants', 'Click individual UUID or Copy All'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a UUID?', acceptedAnswer: { '@type': 'Answer', text: 'A UUID (Universally Unique Identifier) is a 128-bit value formatted as 32 hexadecimal digits in 8-4-4-4-12 groups separated by hyphens — for example 550e8400-e29b-41d4-a716-446655440000. Version 4 UUIDs are randomly generated and have a collision probability so low that practical uniqueness is guaranteed.' } },
        { '@type': 'Question', name: 'What is the difference between UUID and GUID?', acceptedAnswer: { '@type': 'Answer', text: 'GUID (Globally Unique Identifier) is Microsoft\'s name for the same standard. They are technically identical. "UUID" is the IETF term (RFC 4122) and "GUID" is the Microsoft term used in .NET and COM, but they refer to the same 128-bit format.' } },
        { '@type': 'Question', name: 'How does crypto.randomUUID() work?', acceptedAnswer: { '@type': 'Answer', text: 'crypto.randomUUID() is a native browser API (and Node.js 14.17+) that generates a Version 4 UUID using the OS cryptographic entropy source. The UUID contains 122 bits of random data (6 bits are reserved for version and variant fields). It is available in all modern browsers without any library.' } },
        { '@type': 'Question', name: 'Should I use UUIDs as primary keys in a database?', acceptedAnswer: { '@type': 'Answer', text: 'UUIDs are a popular choice for distributed systems because they can be generated client-side without a database round-trip. The tradeoff is that random UUIDs (v4) fragment B-tree indexes over time. UUID v7 (time-ordered) or ULID are better choices if index performance is critical.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is a UUID?', a: 'A UUID is a 128-bit identifier formatted as 32 hex digits in 8-4-4-4-12 groups separated by hyphens. Version 4 UUIDs are randomly generated and have a collision probability so low that practical uniqueness is guaranteed across distributed systems.' },
  { q: 'What is the difference between UUID and GUID?', a: "GUID is Microsoft's name for the same standard. They are technically identical — 'UUID' is the IETF term (RFC 4122) used in most languages, while 'GUID' is the Microsoft term used in .NET and COM." },
  { q: 'How does crypto.randomUUID() work?', a: 'It is a native browser API (and Node.js 14.17+) that generates a Version 4 UUID using the OS cryptographic entropy source. It contains 122 bits of random data — 6 bits are reserved for version and variant fields.' },
  { q: 'Should I use UUIDs as database primary keys?', a: 'UUIDs work well in distributed systems because they can be generated client-side. The tradeoff is that random v4 UUIDs fragment B-tree indexes over time. UUID v7 (time-ordered) or ULID are better choices if write performance is critical.' },
];

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);
  const [uuids, setUuids] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  function generate() {
    const n = Math.min(Math.max(1, count), 20);
    setUuids(Array.from({ length: n }, () => generateUUID(uppercase, noDashes)));
    setCopiedIndex(null);
  }

  function handleCopyOne(uuid, i) {
    navigator.clipboard.writeText(uuid).then(() => { setCopiedIndex(i); setTimeout(() => setCopiedIndex(null), 2000); });
  }

  function handleCopyAll() {
    navigator.clipboard.writeText(uuids.join('\n')).then(() => { setCopiedAll(true); setTimeout(() => setCopiedAll(false), 2000); });
  }

  return (
    <>
      <Head>
        <title>UUID / GUID Generator — Free Online Tool | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generate one or many UUID v4 identifiers instantly. Options for uppercase, no dashes, and bulk generation up to 20. No sign-up required." />
        <meta name="keywords" content="UUID generator, GUID generator, UUID v4, random UUID, online UUID, bulk UUID" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://www.savanpadaliya.com/tools/uuid-generator" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="UUID / GUID Generator — Savan Padaliya" />
        <meta property="og:description" content="Generate UUID v4 identifiers in bulk. Uppercase and no-dashes options. Free, instant, no sign-up." />
        <meta property="og:url" content="https://www.savanpadaliya.com/tools/uuid-generator" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="UUID / GUID Generator — Savan Padaliya" />
        <meta name="twitter:description" content="Generate UUID v4 identifiers in bulk. Uppercase and no-dashes options. Free, no sign-up." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>UUID Generator</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>UUID / GUID Generator</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Generate UUID v4 identifiers. Bulk generation up to 20. Everything runs in your browser.</p>

            <div className="tool-card-ui mt-4">
              <div className="row g-3 align-items-end mb-4">
                <div className="col-auto">
                  <label className="tool-label mb-2 d-block">Count</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    style={{ width: 80, padding: '0.45rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 8, fontSize: '0.9rem' }}
                  />
                </div>
                <div className="col">
                  <div className="d-flex gap-4 flex-wrap">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>
                      <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} style={{ accentColor: '#3081D0', width: 16, height: 16 }} />
                      Uppercase
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>
                      <input type="checkbox" checked={noDashes} onChange={(e) => setNoDashes(e.target.checked)} style={{ accentColor: '#3081D0', width: 16, height: 16 }} />
                      No dashes
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mb-4">
                <button className="btn-primary-custom px-4" onClick={generate}>Generate</button>
                {uuids.length > 1 && (
                  <button className="btn-outline-custom px-4" onClick={handleCopyAll}>
                    {copiedAll ? 'Copied!' : 'Copy All'}
                  </button>
                )}
              </div>

              {uuids.length > 0 && (
                <div>
                  {uuids.map((uuid, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                      marginBottom: 6,
                      background: '#fafafa',
                    }}>
                      <code style={{ fontSize: '0.875rem', color: '#1a1a1a', letterSpacing: '0.02em', wordBreak: 'break-all' }}>{uuid}</code>
                      <button
                        onClick={() => handleCopyOne(uuid, i)}
                        style={{ flexShrink: 0, marginLeft: 12, fontSize: '0.75rem', fontWeight: 600, color: copiedIndex === i ? '#22c55e' : '#3081D0', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        {copiedIndex === i ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {uuids.length === 0 && (
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>Click Generate to create UUID(s)</p>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Set the count (1–20), toggle Uppercase or No dashes if needed, then click Generate. The tool calls crypto.randomUUID() once per UUID — the browser's native cryptographically secure UUID v4 generator. Click Copy next to any individual UUID to copy just that one, or click Copy All to copy the full list as newline-separated values. Nothing is sent to any server."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/random-string" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Random String</Link>
                <Link href="/tools/password-generator" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Password Generator</Link>
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
