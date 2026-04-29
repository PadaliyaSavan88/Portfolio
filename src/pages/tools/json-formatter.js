import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

SyntaxHighlighter.registerLanguage('json', json);

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'JSON Formatter & Validator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online JSON formatter, validator, and minifier. Format JSON with syntax highlighting, validate for errors, or minify for production. Runs entirely in your browser.',
      url: 'https://savanpadaliya.com/tools/json-formatter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Format JSON with syntax highlighting', 'Validate JSON and show parse errors', 'Minify JSON to compact string', 'One-click copy to clipboard'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a JSON formatter?', acceptedAnswer: { '@type': 'Answer', text: 'A JSON formatter reads raw JSON text and outputs it with consistent indentation so it is readable by humans. It also validates that the input is syntactically correct and displays a clear error message if not.' } },
        { '@type': 'Question', name: 'How do I format JSON online?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your JSON into the input field and click Format. The tool indents and colour-codes the output instantly. Everything runs in your browser — nothing is sent to a server.' } },
        { '@type': 'Question', name: 'What does minifying JSON mean?', acceptedAnswer: { '@type': 'Answer', text: 'Minifying removes all whitespace, newlines, and indentation to produce the smallest possible string — useful for APIs and network payloads where file size matters.' } },
        { '@type': 'Question', name: 'Why is my JSON invalid?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes: trailing commas after the last item (not allowed in JSON), single quotes instead of double quotes, unquoted property keys, and undefined or NaN values. The error message points to the exact position.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is a JSON formatter?', a: 'A JSON formatter reads raw JSON text and outputs it with consistent indentation so it is readable by humans. It also validates that the input is syntactically correct and displays a clear error message if not.' },
  { q: 'How do I format JSON online?', a: 'Paste your JSON into the input field and click Format. The tool indents and colour-codes the output instantly. Everything runs in your browser — nothing is sent to a server.' },
  { q: 'What does minifying JSON mean?', a: 'Minifying removes all whitespace, newlines, and indentation to produce the smallest possible string — useful for APIs and network payloads where file size matters.' },
  { q: 'Why is my JSON invalid?', a: 'Common causes: trailing commas after the last item (not allowed in JSON), single quotes instead of double quotes, unquoted property keys, and undefined or NaN values. The parser error message points to the exact position.' },
];

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  function parse(raw) { return JSON.parse(raw); }

  function handleFormat() {
    if (!input.trim()) { setStatus({ type: 'error', msg: 'Paste some JSON first.' }); return; }
    try { setOutput(JSON.stringify(parse(input), null, 2)); setStatus({ type: 'success', msg: 'Valid JSON' }); }
    catch (e) { setOutput(''); setStatus({ type: 'error', msg: e.message }); }
  }

  function handleMinify() {
    if (!input.trim()) { setStatus({ type: 'error', msg: 'Paste some JSON first.' }); return; }
    try { setOutput(JSON.stringify(parse(input))); setStatus({ type: 'success', msg: 'Valid JSON — minified' }); }
    catch (e) { setOutput(''); setStatus({ type: 'error', msg: e.message }); }
  }

  function handleValidate() {
    if (!input.trim()) { setStatus({ type: 'error', msg: 'Paste some JSON first.' }); return; }
    try { parse(input); setStatus({ type: 'success', msg: 'Valid JSON' }); }
    catch (e) { setStatus({ type: 'error', msg: e.message }); }
  }

  function handleClear() { setInput(''); setOutput(''); setStatus(null); }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      <Head>
        <title>JSON Formatter & Validator — Free Online Tool | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Free online JSON formatter, validator, and minifier. Paste JSON to format with syntax highlighting, validate, or minify. Instant, client-side, no sign-up." />
        <meta name="keywords" content="JSON formatter, JSON validator, JSON beautifier, JSON minifier, format JSON online, pretty print JSON" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/json-formatter" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free JSON Formatter & Validator — Savan Padaliya" />
        <meta property="og:description" content="Format, validate, and minify JSON instantly. Syntax highlighted output, one-click copy. No sign-up required." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/json-formatter" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Free JSON Formatter & Validator — Savan Padaliya" />
        <meta name="twitter:description" content="Format, validate, and minify JSON instantly. Syntax highlighted output, one-click copy. No sign-up required." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>JSON Formatter</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>JSON Formatter & Validator</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Paste JSON to format, validate, or minify it. Everything runs in your browser — nothing is sent to a server.</p>

            <div className="tool-card-ui">
              <div className="mb-3">
                <label className="tool-label" htmlFor="json-input">Input JSON</label>
                <textarea
                  id="json-input"
                  className="form-control"
                  rows={10}
                  placeholder={'{\n  "name": "Savan",\n  "role": "Full Stack Developer"\n}'}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setStatus(null); }}
                  style={{ fontFamily: "'Courier New', monospace", fontSize: '0.875rem', borderRadius: 8, resize: 'vertical' }}
                />
              </div>
              <div className="d-flex gap-2 flex-wrap mb-3">
                <button className="btn-primary-custom px-4" onClick={handleFormat}>Format</button>
                <button className="btn-outline-custom px-4" onClick={handleMinify}>Minify</button>
                <button className="btn-outline-custom px-4" onClick={handleValidate}>Validate</button>
                <button onClick={handleClear} style={{ background: 'none', border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem 1.25rem', color: '#6b7280', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>Clear</button>
              </div>
              {status && <p className={status.type === 'error' ? 'tool-error' : 'tool-success'}>{status.type === 'success' ? '✓ ' : '✗ '}{status.msg}</p>}
              {output && (
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="tool-label mb-0">Output</p>
                    <button className="btn-outline-custom px-3 py-1" style={{ fontSize: '0.8rem' }} onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
                  </div>
                  <div style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <SyntaxHighlighter language="json" style={atomDark} customStyle={{ margin: 0, borderRadius: 8, fontSize: '0.85rem' }} showLineNumbers={output.length > 200}>{output}</SyntaxHighlighter>
                  </div>
                </div>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Paste any JSON text into the input field. Click Format to pretty-print it with 2-space indentation and syntax highlighting, Minify to produce the smallest valid JSON string, or Validate to check whether your JSON is syntactically correct. The tool uses the browser's built-in JSON.parse() — no data leaves your machine."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/json-csv-converter" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>JSON ↔ CSV</Link>
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
