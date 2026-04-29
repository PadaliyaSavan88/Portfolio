import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

function capitalize(w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }

function toWords(str) {
  return str.trim().split(/[\s_\-]+/).filter(Boolean);
}

function convert(input) {
  if (!input.trim()) return null;
  const words = toWords(input);
  return {
    lowercase: input.toLowerCase(),
    uppercase: input.toUpperCase(),
    titleCase: words.map(capitalize).join(' '),
    camelCase: words.map((w, i) => (i === 0 ? w.toLowerCase() : capitalize(w))).join(''),
    pascalCase: words.map(capitalize).join(''),
    snakeCase: words.map((w) => w.toLowerCase()).join('_'),
    kebabCase: words.map((w) => w.toLowerCase()).join('-'),
    constantCase: words.map((w) => w.toUpperCase()).join('_'),
  };
}

const LABELS = [
  ['lowercase', 'lowercase'],
  ['uppercase', 'UPPERCASE'],
  ['titleCase', 'Title Case'],
  ['camelCase', 'camelCase'],
  ['pascalCase', 'PascalCase'],
  ['snakeCase', 'snake_case'],
  ['kebabCase', 'kebab-case'],
  ['constantCase', 'CONSTANT_CASE'],
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Case Converter',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online case converter. Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, uppercase, and lowercase. Instant, client-side.',
      url: 'https://savanpadaliya.com/tools/case-converter',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['8 case formats: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, UPPER, lower', 'Auto-converts on keystroke', 'One-click copy per format', 'Handles spaces, hyphens, and underscores as word delimiters'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is camelCase?', acceptedAnswer: { '@type': 'Answer', text: 'camelCase writes compound words with no spaces, where every word after the first starts with a capital letter — for example "myVariableName". It is the standard naming convention for variables and functions in JavaScript, Java, and Swift.' } },
        { '@type': 'Question', name: 'What is snake_case used for?', acceptedAnswer: { '@type': 'Answer', text: 'snake_case separates words with underscores, all in lowercase — for example "my_variable_name". It is the dominant convention in Python (PEP 8), Ruby, and SQL column names, as well as file names on Linux.' } },
        { '@type': 'Question', name: 'What is the difference between PascalCase and camelCase?', acceptedAnswer: { '@type': 'Answer', text: 'Both formats run words together without spaces, but PascalCase capitalises every word including the first (e.g. MyComponent), while camelCase keeps the first word all lowercase (e.g. myComponent). PascalCase is the convention for class names and React components; camelCase for variables and function names.' } },
        { '@type': 'Question', name: 'What is kebab-case?', acceptedAnswer: { '@type': 'Answer', text: 'kebab-case joins words with hyphens, all in lowercase — for example "my-component-name". It is used for CSS class names, HTML attributes, URL slugs, and file names in web projects. It is sometimes called spinal-case or lisp-case.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is camelCase?', a: 'camelCase writes compound words without spaces, capitalising every word after the first — e.g. "myVariableName". It is the standard convention for variables and functions in JavaScript, Java, and Swift.' },
  { q: 'What is snake_case used for?', a: 'snake_case separates words with underscores, all lowercase — e.g. "my_variable_name". It is the dominant convention in Python (PEP 8), Ruby, SQL column names, and Linux file names.' },
  { q: 'What is the difference between PascalCase and camelCase?', a: 'Both join words without spaces, but PascalCase capitalises every word including the first (MyComponent), while camelCase keeps the first word lowercase (myComponent). PascalCase is for class names and React components; camelCase is for variables.' },
  { q: 'What is kebab-case?', a: 'kebab-case joins words with hyphens in all lowercase — e.g. "my-component-name". It is used for CSS class names, URL slugs, and HTML file names. Also called spinal-case or lisp-case.' },
];

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const result = convert(input);

  function handleCopy(key, value) {
    navigator.clipboard.writeText(value).then(() => { setCopied(key); setTimeout(() => setCopied(''), 2000); });
  }

  return (
    <>
      <Head>
        <title>Case Converter — camelCase, snake_case, PascalCase & More | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Convert text between camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case, uppercase, and lowercase. Free online tool." />
        <meta name="keywords" content="case converter, camelCase, snake_case, PascalCase, kebab-case, text converter, online tool" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/case-converter" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Case Converter — camelCase, snake_case & More | Savan Padaliya" />
        <meta property="og:description" content="Convert text to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more. Free, instant, no sign-up." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/case-converter" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Case Converter — camelCase, snake_case & More | Savan Padaliya" />
        <meta name="twitter:description" content="Convert text to camelCase, PascalCase, snake_case, kebab-case, and more. Free and instant." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Case Converter</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Case Converter</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Type or paste text to instantly see all 8 case variants with one-click copy.</p>

            <div className="tool-card-ui mt-4">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="tool-label mb-0">Input text</label>
                  <button onClick={() => setInput('')} style={{ fontSize: '0.78rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>Clear</button>
                </div>
                <textarea
                  className="form-control"
                  rows={3}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="hello world foo bar"
                  style={{ fontSize: '0.95rem', borderRadius: 8, resize: 'vertical' }}
                />
              </div>

              {result && (
                <div>
                  {LABELS.map(([key, label]) => (
                    <div key={key} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.85rem',
                      borderRadius: 8,
                      border: '1px solid #e5e7eb',
                      marginBottom: 8,
                      background: '#fafafa',
                      gap: 12,
                    }}>
                      <div style={{ minWidth: 110, fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0 }}>{label}</div>
                      <code style={{ flexGrow: 1, fontSize: '0.9rem', color: '#1a1a1a', wordBreak: 'break-all' }}>{result[key]}</code>
                      <button
                        onClick={() => handleCopy(key, result[key])}
                        style={{
                          flexShrink: 0,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: copied === key ? '#22c55e' : '#3081D0',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.2rem 0.5rem',
                        }}
                      >
                        {copied === key ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!input && (
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center', padding: '1rem 0' }}>Start typing above to see all case variants</p>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Type or paste text into the input field. The tool splits the input on spaces, hyphens, and underscores to identify word boundaries, then applies each of the 8 transformations in real time. Click Copy next to any format to copy just that variant to your clipboard. No button press needed — results update on every keystroke."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/regex-tester" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Regex Tester</Link>
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
