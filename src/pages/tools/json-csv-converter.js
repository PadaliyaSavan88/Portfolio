import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

function jsonToCsv(jsonStr) {
  const data = JSON.parse(jsonStr);
  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return '';
  const headers = Object.keys(arr[0]);
  const escape = (val) => {
    const s = val === null || val === undefined ? '' : typeof val === 'object' ? JSON.stringify(val) : String(val);
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = arr.map((obj) => headers.map((h) => escape(obj[h])).join(','));
  return [headers.join(','), ...rows].join('\n');
}

function csvToJson(csvStr) {
  const lines = csvStr.trim().split('\n').filter(Boolean);
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row.');
  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const vals = parseCSVLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']));
  });
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'JSON ↔ CSV Converter',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online JSON to CSV and CSV to JSON converter. Convert between JSON arrays and CSV format instantly in your browser. No sign-up required.',
      url: 'https://savanpadaliya.com/tools/json-csv-converter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Convert JSON array to CSV', 'Convert CSV to JSON array', 'Handles quoted fields and commas', 'One-click copy output'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What JSON structure can I convert to CSV?', acceptedAnswer: { '@type': 'Answer', text: 'The tool accepts a JSON array of flat objects where each object has the same keys. The keys become the CSV header row and each object becomes a data row. Nested objects are serialised as JSON strings in the CSV cell.' } },
        { '@type': 'Question', name: 'Does the CSV converter handle commas inside values?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool follows RFC 4180 — values containing commas, double quotes, or newlines are automatically wrapped in double quotes and internal double quotes are escaped by doubling them.' } },
        { '@type': 'Question', name: 'What happens to nested JSON objects when converting to CSV?', acceptedAnswer: { '@type': 'Answer', text: 'Nested objects and arrays are serialised to their JSON string representation and placed in the CSV cell. This preserves all data but you may need to post-process the nested columns.' } },
        { '@type': 'Question', name: 'Is the converted data sent to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All conversion logic runs entirely in your browser using JavaScript. Your data never leaves your machine.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What JSON structure can I convert to CSV?', a: 'The tool accepts a JSON array of flat objects where each object has the same keys. Keys become the CSV header row and each object becomes a data row. Nested objects are serialised as JSON strings in the cell.' },
  { q: 'Does it handle commas inside values?', a: 'Yes. The tool follows RFC 4180 — values containing commas, double quotes, or newlines are automatically wrapped in double quotes, and internal double quotes are escaped by doubling them.' },
  { q: 'What happens to nested JSON when converting to CSV?', a: 'Nested objects and arrays are serialised to their JSON string representation and placed in the CSV cell. All data is preserved, but you may need to post-process deeply nested columns.' },
  { q: 'Is my data sent to a server?', a: 'No. All conversion logic runs entirely in your browser using JavaScript. Your data never leaves your machine.' },
];

export default function JsonCsvConverter() {
  const [mode, setMode] = useState('json-to-csv');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function handleConvert() {
    if (!input.trim()) { setError('Paste some content first.'); return; }
    try {
      if (mode === 'json-to-csv') {
        setOutput(jsonToCsv(input));
      } else {
        setOutput(JSON.stringify(csvToJson(input), null, 2));
      }
      setError('');
    } catch (e) {
      setOutput('');
      setError(e.message);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const SAMPLE_JSON = `[
  { "name": "Alice", "age": 30, "city": "London" },
  { "name": "Bob", "age": 25, "city": "New York" }
]`;
  const SAMPLE_CSV = `name,age,city\nAlice,30,London\nBob,25,New York`;

  return (
    <>
      <Head>
        <title>JSON to CSV / CSV to JSON Converter — Free Tool | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Free online JSON to CSV and CSV to JSON converter. Paste your data, convert instantly, and copy the result. No sign-up required." />
        <meta name="keywords" content="JSON to CSV, CSV to JSON, JSON converter, CSV converter, free online converter" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/json-csv-converter" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="JSON ↔ CSV Converter — Savan Padaliya" />
        <meta property="og:description" content="Convert between JSON arrays and CSV format instantly. Handles commas, quotes, and nested values. Free, client-side, no sign-up." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/json-csv-converter" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="JSON ↔ CSV Converter — Savan Padaliya" />
        <meta name="twitter:description" content="Convert between JSON arrays and CSV format instantly. Free, client-side, no sign-up." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>JSON ↔ CSV Converter</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>JSON ↔ CSV Converter</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Convert between JSON arrays and CSV format. Everything runs in your browser.</p>

            <div className="tool-card-ui">
              <div className="d-flex gap-2 mb-4">
                {[['json-to-csv', 'JSON → CSV'], ['csv-to-json', 'CSV → JSON']].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => { setMode(val); setInput(''); setOutput(''); setError(''); }}
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
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="tool-label mb-0">Input ({mode === 'json-to-csv' ? 'JSON array' : 'CSV'})</label>
                  <button
                    onClick={() => { setInput(mode === 'json-to-csv' ? SAMPLE_JSON : SAMPLE_CSV); setOutput(''); setError(''); }}
                    style={{ fontSize: '0.78rem', color: '#3081D0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >Load sample</button>
                </div>
                <textarea
                  className="form-control"
                  rows={8}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setError(''); }}
                  placeholder={mode === 'json-to-csv' ? '[{"name": "Alice", "age": 30}]' : 'name,age\nAlice,30'}
                  style={{ fontFamily: "'Courier New', monospace", fontSize: '0.875rem', borderRadius: 8, resize: 'vertical' }}
                />
              </div>

              <div className="d-flex gap-2 mb-3">
                <button className="btn-primary-custom px-4" onClick={handleConvert}>Convert</button>
                <button onClick={() => { setInput(''); setOutput(''); setError(''); }}
                  style={{ background: 'none', border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem 1.25rem', color: '#6b7280', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                  Clear
                </button>
              </div>

              {error && <p className="tool-error">✗ {error}</p>}

              {output && (
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="tool-label mb-0">Output</p>
                    <button className="btn-outline-custom px-3 py-1" style={{ fontSize: '0.8rem' }} onClick={handleCopy}>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <textarea
                    className="form-control"
                    rows={8}
                    readOnly
                    value={output}
                    style={{ fontFamily: "'Courier New', monospace", fontSize: '0.875rem', borderRadius: 8, background: '#f8f9fa' }}
                  />
                </div>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Select JSON → CSV or CSV → JSON mode. In JSON → CSV mode, paste a JSON array of objects and click Convert — the tool reads the keys from the first object as column headers and serialises each array element as a row, quoting any values that contain commas or newlines. In CSV → JSON mode, paste a CSV with a header row and click Convert — each row becomes a JSON object keyed by the header names. Nothing is sent to any server."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/json-formatter" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>JSON Formatter</Link>
                <Link href="/tools/base64" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Base64 Encoder</Link>
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
