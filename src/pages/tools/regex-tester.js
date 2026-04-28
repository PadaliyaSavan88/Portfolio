import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const CHEAT_SHEET = [
  { cat: 'Anchors', items: [['\\b', 'Word boundary'], ['\\B', 'Non-word boundary'], ['^', 'Start of string'], ['$', 'End of string']] },
  { cat: 'Quantifiers', items: [['*', '0 or more'], ['+', '1 or more'], ['?', '0 or 1'], ['{n}', 'Exactly n'], ['{n,m}', 'Between n and m']] },
  { cat: 'Character Classes', items: [['.', 'Any char (except newline)'], ['\\d', 'Digit [0-9]'], ['\\w', 'Word char [A-Za-z0-9_]'], ['\\s', 'Whitespace'], ['\\D', 'Non-digit'], ['\\W', 'Non-word'], ['\\S', 'Non-whitespace']] },
  { cat: 'Groups', items: [['(abc)', 'Capturing group'], ['(?:abc)', 'Non-capturing group'], ['(?<name>abc)', 'Named group'], ['(?=abc)', 'Positive lookahead'], ['(?!abc)', 'Negative lookahead']] },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Regex Tester',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online regex tester with live match highlighting, flag toggles (g, i, m, s), named group support, and a built-in regex cheat sheet. No sign-up required.',
      url: 'https://www.savanpadaliya.com/tools/regex-tester',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://www.savanpadaliya.com' },
      featureList: ['Live match highlighting', 'Flag toggles: g, i, m, s', 'Named capture group support', 'Built-in regex cheat sheet'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What regex flags does this tester support?', acceptedAnswer: { '@type': 'Answer', text: 'The tool supports four flags: g (global — find all matches), i (case-insensitive), m (multiline — ^ and $ match line boundaries), and s (dotAll — . matches newlines). The g flag is enabled by default so all matches are highlighted.' } },
        { '@type': 'Question', name: 'What are named capture groups in regex?', acceptedAnswer: { '@type': 'Answer', text: 'Named capture groups use the syntax (?<name>pattern) and let you refer to a matched group by name instead of a positional index. For example, (?<year>\\d{4}) captures four digits into a group called "year". The tester shows named groups alongside each match.' } },
        { '@type': 'Question', name: 'Why does my regex match nothing with the m flag?', acceptedAnswer: { '@type': 'Answer', text: 'The m (multiline) flag only changes the behaviour of ^ and $ — it does not make . match newlines. To match across line breaks, enable the s (dotAll) flag so that . matches any character including \\n.' } },
        { '@type': 'Question', name: 'What is the difference between \\d and [0-9]?', acceptedAnswer: { '@type': 'Answer', text: 'In JavaScript regex, \\d and [0-9] are equivalent — both match a single decimal digit. \\d is shorter and more readable. The equivalent negation, \\D, matches any character that is not a digit.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What regex flags does this tester support?', a: 'g (global — all matches), i (case-insensitive), m (multiline — ^ and $ match line boundaries), and s (dotAll — . matches newlines). The g flag is on by default so all matches are highlighted simultaneously.' },
  { q: 'What are named capture groups?', a: 'Named groups use (?<name>pattern) syntax and let you reference a matched group by name instead of index. For example, (?<year>\\d{4}) captures four digits as "year". The tester shows named groups alongside each match result.' },
  { q: 'Why does my regex match nothing with the m flag?', a: 'The m flag only changes ^ and $ to match line boundaries — it does not make . match newlines. Enable the s (dotAll) flag as well if you need . to match across line breaks.' },
  { q: 'What is the difference between \\d and [0-9]?', a: 'In JavaScript regex, \\d and [0-9] are equivalent — both match one decimal digit. \\d is shorter. The negated form \\D matches any non-digit character.' },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testStr, setTestStr] = useState('');
  const [showCheat, setShowCheat] = useState(false);
  const [error, setError] = useState('');

  function getActiveFlags() {
    return Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join('');
  }

  function getMatches() {
    if (!pattern || !testStr) return [];
    try {
      setError('');
      const f = getActiveFlags().includes('g') ? getActiveFlags() : getActiveFlags() + 'g';
      const re = new RegExp(pattern, f);
      return [...testStr.matchAll(re)].map((m) => ({
        match: m[0],
        index: m.index,
        groups: m.groups ? Object.entries(m.groups) : [],
      }));
    } catch (e) {
      setError(e.message);
      return [];
    }
  }

  function renderHighlighted() {
    if (!pattern || !testStr) return testStr;
    try {
      const f = getActiveFlags().includes('g') ? getActiveFlags() : getActiveFlags() + 'g';
      const re = new RegExp(pattern, f);
      const parts = [];
      let last = 0;
      for (const m of testStr.matchAll(re)) {
        if (m.index > last) parts.push(<span key={last}>{testStr.slice(last, m.index)}</span>);
        parts.push(<mark key={m.index} style={{ background: '#fef08a', borderRadius: 3 }}>{m[0]}</mark>);
        last = m.index + m[0].length;
      }
      if (last < testStr.length) parts.push(<span key={last}>{testStr.slice(last)}</span>);
      return parts;
    } catch {
      return testStr;
    }
  }

  const matches = pattern && testStr ? getMatches() : [];

  return (
    <>
      <Head>
        <title>Regex Tester & Cheat Sheet — Free Online Tool | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Test regular expressions online with live match highlighting, flag toggles, and a built-in regex cheat sheet. Free, no sign-up required." />
        <meta name="keywords" content="regex tester, regular expression tester, regex checker, regex cheat sheet, online regex" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://www.savanpadaliya.com/tools/regex-tester" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Regex Tester & Cheat Sheet — Savan Padaliya" />
        <meta property="og:description" content="Test regular expressions with live match highlighting and flag toggles. Includes a built-in regex cheat sheet. Free, no sign-up." />
        <meta property="og:url" content="https://www.savanpadaliya.com/tools/regex-tester" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Regex Tester & Cheat Sheet — Savan Padaliya" />
        <meta name="twitter:description" content="Test regular expressions with live match highlighting and flag toggles. Free, no sign-up." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Regex Tester</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Regex Tester</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Test regular expressions with live highlighting. Toggle flags and see matches instantly.</p>

            <div className="tool-card-ui mt-4">
              <div className="mb-3">
                <label className="tool-label mb-2 d-block">Pattern</label>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <div style={{ position: 'relative', flexGrow: 1 }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '1.1rem' }}>/</span>
                    <input
                      className="form-control"
                      value={pattern}
                      onChange={(e) => { setPattern(e.target.value); setError(''); }}
                      placeholder="e.g. \b\w+@\w+\.\w+\b"
                      style={{ fontFamily: "'Courier New', monospace", paddingLeft: 28, borderRadius: 8 }}
                    />
                  </div>
                  <div className="d-flex gap-3 align-items-center" style={{ flexShrink: 0 }}>
                    {['g', 'i', 'm', 's'].map((f) => (
                      <label key={f} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, color: flags[f] ? '#3081D0' : '#6b7280' }}>
                        <input type="checkbox" checked={flags[f]} onChange={(e) => setFlags((prev) => ({ ...prev, [f]: e.target.checked }))} style={{ accentColor: '#3081D0' }} />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>
                {error && <p className="tool-error mt-2">{error}</p>}
              </div>

              <div className="mb-3">
                <label className="tool-label mb-2 d-block">Test String</label>
                <textarea
                  className="form-control"
                  rows={5}
                  value={testStr}
                  onChange={(e) => setTestStr(e.target.value)}
                  placeholder="Paste text to test against..."
                  style={{ fontFamily: "'Courier New', monospace", fontSize: '0.875rem', borderRadius: 8 }}
                />
              </div>

              {(pattern && testStr) && (
                <>
                  <div className="mb-3">
                    <p className="tool-label mb-2">Highlighted matches</p>
                    <div style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: '0.875rem',
                      background: '#f8f9fa',
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: '0.75rem 1rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      minHeight: 48,
                    }}>
                      {renderHighlighted()}
                    </div>
                  </div>

                  <div>
                    <p className="tool-label mb-2">
                      Matches <span style={{ fontWeight: 400, color: '#6b7280' }}>({matches.length} found)</span>
                    </p>
                    {matches.length === 0 && !error && (
                      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>No matches found.</p>
                    )}
                    {matches.map((m, i) => (
                      <div key={i} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 6, padding: '0.5rem 0.75rem', marginBottom: 6, fontSize: '0.875rem' }}>
                        <code style={{ fontWeight: 700 }}>{JSON.stringify(m.match)}</code>
                        <span style={{ color: '#6b7280', marginLeft: 12 }}>index {m.index}</span>
                        {m.groups.length > 0 && (
                          <span style={{ color: '#3081D0', marginLeft: 12 }}>
                            groups: {m.groups.map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="tool-card-ui mt-4" style={{ padding: '1.25rem 2rem' }}>
              <button
                onClick={() => setShowCheat((v) => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, color: '#1a1a1a', fontSize: '1rem', padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <span>{showCheat ? '▾' : '▸'}</span> Regex Cheat Sheet
              </button>
              {showCheat && (
                <div className="row g-4 mt-2">
                  {CHEAT_SHEET.map((section) => (
                    <div key={section.cat} className="col-md-6">
                      <p style={{ fontWeight: 700, color: '#374151', marginBottom: 6, fontSize: '0.875rem' }}>{section.cat}</p>
                      {section.items.map(([token, desc]) => (
                        <div key={token} style={{ display: 'flex', gap: 12, marginBottom: 4, fontSize: '0.8rem' }}>
                          <code style={{ background: '#f3f4f6', padding: '0.1em 0.4em', borderRadius: 4, minWidth: 90, fontWeight: 700 }}>{token}</code>
                          <span style={{ color: '#6b7280' }}>{desc}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Enter your regular expression pattern in the pattern field and paste the text you want to test in the Test String area. Toggle the g, i, m, and s flags using the checkboxes. Matches are highlighted live in the highlighted output panel and listed individually below with their index position and any named capture groups. Click the Regex Cheat Sheet button to expand a reference of common patterns. Everything runs in the browser using the native JavaScript RegExp engine."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/case-converter" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Case Converter</Link>
                <Link href="/tools/diff-checker" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Diff Checker</Link>
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
