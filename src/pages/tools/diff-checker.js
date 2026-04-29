import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { diffLines } from 'diff';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const SAMPLE_A = `function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}`;

const SAMPLE_B = `function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  // multiply two numbers
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}`;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Diff Checker',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online diff checker. Paste two texts side by side and see added, removed, and unchanged lines highlighted in green and red. No sign-up required.',
      url: 'https://savanpadaliya.com/tools/diff-checker',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Line-by-line diff with color coding', 'Added/removed line counts', 'Copy diff as unified patch', 'Load sample to explore the UI'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What algorithm does the diff checker use?', acceptedAnswer: { '@type': 'Answer', text: 'The tool uses the diff npm package which implements Myers\' diff algorithm — the same algorithm used by Git. It finds the minimal set of added and removed lines needed to transform one text into the other.' } },
        { '@type': 'Question', name: 'What does a unified diff format look like?', acceptedAnswer: { '@type': 'Answer', text: 'A unified diff prefixes each line with + (added), - (removed), or a space (unchanged). It is the format produced by "git diff" and "diff -u" and can be applied to files using the "patch" command.' } },
        { '@type': 'Question', name: 'Can I compare code files with this tool?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Paste the content of any two text-based files — source code, configuration files, JSON, Markdown, or plain text — and click Compare to see the line-by-line differences.' } },
        { '@type': 'Question', name: 'Is there a size limit on the text I can compare?', acceptedAnswer: { '@type': 'Answer', text: 'There is no hard limit — the tool runs the diff algorithm entirely in your browser. Very large texts (thousands of lines) may be slightly slower as the algorithm\'s complexity grows with input size, but typical code files compare instantly.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What algorithm does the diff checker use?', a: "The tool uses the diff npm package which implements Myers' diff algorithm — the same algorithm used by Git. It finds the minimal set of added and removed lines needed to transform one text into the other." },
  { q: 'What does a unified diff format look like?', a: 'A unified diff prefixes each line with + (added), - (removed), or a space (unchanged). It is the format produced by "git diff" and "diff -u" and can be applied with the "patch" command.' },
  { q: 'Can I compare code files?', a: 'Yes. Paste the contents of any two text-based files — source code, config files, JSON, Markdown, or plain text — and click Compare to see the line-by-line differences.' },
  { q: 'Is there a size limit?', a: "No hard limit — the tool runs the diff algorithm entirely in your browser. Very large texts may be slightly slower as the algorithm's complexity grows with input size, but typical code files compare instantly." },
];

export default function DiffChecker() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diff, setDiff] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleCompare() {
    setDiff(diffLines(original, modified));
  }

  function loadSample() {
    setOriginal(SAMPLE_A);
    setModified(SAMPLE_B);
    setDiff(null);
  }

  const added = diff ? diff.filter((c) => c.added).reduce((s, c) => s + c.count, 0) : 0;
  const removed = diff ? diff.filter((c) => c.removed).reduce((s, c) => s + c.count, 0) : 0;

  function getDiffText() {
    if (!diff) return '';
    return diff.map((c) => {
      const prefix = c.added ? '+' : c.removed ? '-' : ' ';
      return c.value.split('\n').filter((_, i, arr) => i < arr.length - 1 || arr[arr.length - 1] !== '').map((l) => `${prefix} ${l}`).join('\n');
    }).join('\n');
  }

  function handleCopy() {
    navigator.clipboard.writeText(getDiffText()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      <Head>
        <title>Diff Checker — Compare Text Online | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Free online diff checker. Paste two texts side by side and see added, removed, and unchanged lines highlighted. No sign-up required." />
        <meta name="keywords" content="diff checker, text comparison, compare text, diff tool, line diff, online diff" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/diff-checker" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Diff Checker — Compare Text Online | Savan Padaliya" />
        <meta property="og:description" content="Paste two texts and see added, removed, and unchanged lines highlighted in green and red. Free, no sign-up." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/diff-checker" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Diff Checker — Compare Text Online | Savan Padaliya" />
        <meta name="twitter:description" content="Paste two texts and see added, removed, and unchanged lines highlighted. Free, no sign-up." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Diff Checker</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Diff Checker</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Paste two texts and see exactly what changed — line by line.</p>

            <div className="tool-card-ui mt-4">
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="tool-label mb-2 d-block">Original</label>
                  <textarea
                    className="form-control"
                    rows={10}
                    value={original}
                    onChange={(e) => { setOriginal(e.target.value); setDiff(null); }}
                    placeholder="Paste original text here..."
                    style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', borderRadius: 8, resize: 'vertical' }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="tool-label mb-2 d-block">Modified</label>
                  <textarea
                    className="form-control"
                    rows={10}
                    value={modified}
                    onChange={(e) => { setModified(e.target.value); setDiff(null); }}
                    placeholder="Paste modified text here..."
                    style={{ fontFamily: "'Courier New', monospace", fontSize: '0.8rem', borderRadius: 8, resize: 'vertical' }}
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mb-4">
                <button className="btn-primary-custom px-4" onClick={handleCompare}>Compare</button>
                <button onClick={loadSample} style={{ fontSize: '0.875rem', color: '#3081D0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Load sample</button>
                <button onClick={() => { setOriginal(''); setModified(''); setDiff(null); }}
                  style={{ background: 'none', border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem 1.25rem', color: '#6b7280', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                  Clear
                </button>
              </div>

              {diff && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div style={{ fontSize: '0.875rem' }}>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>+{added} added</span>
                      <span style={{ margin: '0 12px', color: '#d1d5db' }}>|</span>
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>-{removed} removed</span>
                    </div>
                    <button className="btn-outline-custom px-3 py-1" style={{ fontSize: '0.8rem' }} onClick={handleCopy}>
                      {copied ? 'Copied!' : 'Copy diff'}
                    </button>
                  </div>
                  <div style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.8rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}>
                    {diff.map((chunk, i) => {
                      const lines = chunk.value.split('\n');
                      if (lines[lines.length - 1] === '') lines.pop();
                      return lines.map((line, j) => (
                        <div key={`${i}-${j}`} style={{
                          padding: '2px 1rem',
                          background: chunk.added ? '#f0fdf4' : chunk.removed ? '#fef2f2' : '#fff',
                          borderLeft: `3px solid ${chunk.added ? '#22c55e' : chunk.removed ? '#ef4444' : 'transparent'}`,
                          color: chunk.added ? '#166534' : chunk.removed ? '#991b1b' : '#374151',
                          whiteSpace: 'pre',
                        }}>
                          <span style={{ userSelect: 'none', marginRight: 8, color: chunk.added ? '#22c55e' : chunk.removed ? '#ef4444' : '#d1d5db' }}>
                            {chunk.added ? '+' : chunk.removed ? '-' : ' '}
                          </span>
                          {line}
                        </div>
                      ));
                    })}
                  </div>
                </div>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Paste the original text in the left panel and the modified text in the right panel, then click Compare. The tool runs Myers' diff algorithm (via the diff package) on the two inputs and displays the result as a colour-coded line diff — green lines with a + prefix are additions, red lines with a - prefix are removals, and unchanged lines are shown in neutral colour. Click Copy diff to copy the result as a standard unified diff format. Nothing is sent to any server."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/markdown-previewer" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Markdown Previewer</Link>
                <Link href="/tools/json-formatter" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>JSON Formatter</Link>
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
