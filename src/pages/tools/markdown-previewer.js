import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

function MermaidDiagram({ chart }) {
  const ref = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });
        const id = 'mermaid-' + Math.random().toString(36).slice(2);
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Diagram error');
      }
    }
    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) return <pre style={{ color: '#ef4444', background: '#fef2f2', padding: '0.75rem', borderRadius: 6, fontSize: '0.8rem' }}>{error}</pre>;
  if (!svg) return <div style={{ color: '#9ca3af', fontSize: '0.8rem', padding: '0.5rem' }}>Rendering diagram…</div>;
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: svg }} style={{ overflowX: 'auto', margin: '0.5rem 0' }} />;
}

const SAMPLE = `# Hello, Markdown!

This is a **live preview** editor. Type on the left, see the result on the right.

## Features

- **Bold**, *italic*, ~~strikethrough~~
- \`inline code\`
- [Links](https://example.com)

## Code Block

\`\`\`js
const greet = name => \`Hello, \${name}!\`;
console.log(greet('World'));
\`\`\`

## Table

| Name  | Role       | Status |
|-------|------------|--------|
| Alice | Developer  | Active |
| Bob   | Designer   | Active |

> Blockquotes work too.

## Diagram

\`\`\`mermaid
graph LR
  A[Start] --> B{Decision}
  B -->|Yes| C[Do it]
  B -->|No| D[Skip it]
  C --> E[End]
  D --> E
\`\`\`
`;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Markdown Previewer',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online Markdown previewer with live side-by-side rendering. Supports GitHub Flavored Markdown including tables, strikethrough, and fenced code blocks. No sign-up required.',
      url: 'https://savanpadaliya.com/tools/markdown-previewer',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Live side-by-side preview', 'GitHub Flavored Markdown (GFM)', 'Tables, strikethrough, fenced code blocks', 'Copy Markdown or rendered HTML'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is GitHub Flavored Markdown (GFM)?', acceptedAnswer: { '@type': 'Answer', text: 'GFM is a superset of CommonMark Markdown supported by GitHub. It adds tables, task lists, strikethrough text (~~text~~), fenced code blocks with language hints, and autolinks. This previewer supports GFM via the remark-gfm plugin.' } },
        { '@type': 'Question', name: 'Can I use this to preview README files?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. GitHub READMEs use GFM, which this tool fully supports including tables, code blocks, and strikethrough. Paste your README source into the editor and see exactly how it will render.' } },
        { '@type': 'Question', name: 'How do I copy the rendered HTML?', acceptedAnswer: { '@type': 'Answer', text: 'Click the Copy HTML button above the editor. The tool reads the innerHTML of the preview panel and copies the raw HTML string to your clipboard.' } },
        { '@type': 'Question', name: 'Is there a word or character limit?', acceptedAnswer: { '@type': 'Answer', text: 'No hard limit — the tool runs entirely in your browser and renders as you type. Very large documents may slow down the preview because the full Markdown is parsed and rendered on every keystroke.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is GitHub Flavored Markdown (GFM)?', a: 'GFM is a superset of CommonMark supported by GitHub. It adds tables, strikethrough (~~text~~), fenced code blocks with language hints, task lists, and autolinks. This previewer uses the remark-gfm plugin for full GFM support.' },
  { q: 'Can I use this to preview README files?', a: 'Yes. GitHub READMEs use GFM, which this tool fully supports. Paste your README source on the left and see exactly how it will render — including tables and code blocks.' },
  { q: 'How do I copy the rendered HTML?', a: 'Click Copy HTML above the editor. The tool reads the innerHTML of the preview panel and copies the raw HTML string to your clipboard.' },
  { q: 'Is there a word or character limit?', a: 'No hard limit — the tool runs entirely in your browser and renders on every keystroke. Very large documents may slow the preview slightly as the full Markdown is parsed each time.' },
];

export default function MarkdownPreviewer() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;

  function handleCopyMarkdown() {
    navigator.clipboard.writeText(input).then(() => { setCopied('md'); setTimeout(() => setCopied(''), 2000); });
  }

  function handleCopyHtml() {
    const div = document.createElement('div');
    div.innerHTML = document.querySelector('.md-preview-panel').innerHTML;
    navigator.clipboard.writeText(div.outerHTML).then(() => { setCopied('html'); setTimeout(() => setCopied(''), 2000); });
  }

  return (
    <>
      <Head>
        <title>Markdown Previewer — Free Live Editor | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Free online Markdown previewer with live side-by-side rendering. Supports GFM tables, code blocks, and strikethrough. No sign-up required." />
        <meta name="keywords" content="markdown previewer, markdown editor, live markdown, markdown to html, online markdown" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/markdown-previewer" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Markdown Previewer — Savan Padaliya" />
        <meta property="og:description" content="Live side-by-side Markdown editor and preview. Supports GFM tables, code blocks, strikethrough. Free, no sign-up." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/markdown-previewer" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Markdown Previewer — Savan Padaliya" />
        <meta name="twitter:description" content="Live side-by-side Markdown editor and preview. Supports GFM tables, code blocks, strikethrough. Free." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Markdown Previewer</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Markdown Previewer</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Live preview editor. Supports GFM tables, images, code blocks, and strikethrough.</p>

            <div className="tool-card-ui mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{wordCount} words · {charCount} characters</div>
                <div className="d-flex gap-2">
                  <button onClick={() => { setInput(SAMPLE); setCopied(''); }}
                    style={{ fontSize: '0.78rem', color: '#3081D0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Load sample
                  </button>
                  <button onClick={() => setInput('')}
                    style={{ fontSize: '0.78rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Clear
                  </button>
                  <button className="btn-outline-custom px-3" style={{ fontSize: '0.78rem' }} onClick={handleCopyMarkdown}>
                    {copied === 'md' ? 'Copied!' : 'Copy Markdown'}
                  </button>
                  <button className="btn-outline-custom px-3" style={{ fontSize: '0.78rem' }} onClick={handleCopyHtml}>
                    {copied === 'html' ? 'Copied!' : 'Copy HTML'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="tool-label mb-2 d-block">Markdown Input</label>
                  <textarea
                    className="form-control"
                    rows={8}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type or paste your Markdown here..."
                    style={{ fontFamily: "'Courier New', monospace", fontSize: '0.875rem', borderRadius: 8, resize: 'vertical' }}
                  />
                </div>
                <div>
                  <label className="tool-label mb-2 d-block">Preview</label>
                  <div
                    className="md-preview-panel"
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: '1.5rem 1.75rem',
                      minHeight: 600,
                      background: '#fff',
                      fontSize: '0.95rem',
                      lineHeight: 1.75,
                      overflowY: 'auto',
                    }}
                  >
                    {input ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          img({ src, alt }) {
                            return <img src={src} alt={alt || ''} style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block', margin: '0.5rem 0' }} />;
                          },
                          code({ inline, className, children }) {
                            if (!inline && className === 'language-mermaid') {
                              return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                            }
                            return inline
                              ? <code style={{ background: '#f3f4f6', padding: '0.1em 0.35em', borderRadius: 4, fontSize: '0.85em', fontFamily: 'monospace' }}>{children}</code>
                              : <pre style={{ background: '#1e1e1e', color: '#d4d4d4', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontSize: '0.85em' }}><code>{children}</code></pre>;
                          },
                          table({ children }) {
                            return <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '1rem' }}>{children}</table>;
                          },
                          th({ children }) {
                            return <th style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', background: '#f9fafb', fontWeight: 700 }}>{children}</th>;
                          },
                          td({ children }) {
                            return <td style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem' }}>{children}</td>;
                          },
                          blockquote({ children }) {
                            return <blockquote style={{ borderLeft: '3px solid #3081D0', marginLeft: 0, paddingLeft: '1rem', color: '#6b7280' }}>{children}</blockquote>;
                          },
                        }}
                      >
                        {input}
                      </ReactMarkdown>
                    ) : (
                      <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Preview will appear here...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Type or paste Markdown into the left panel. The right panel renders a live preview using react-markdown with the remark-gfm plugin, which handles GitHub Flavored Markdown including tables, strikethrough, fenced code blocks, and autolinks. Click Copy Markdown to copy your source, or Copy HTML to copy the rendered HTML output. Nothing is sent to any server."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/json-formatter" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>JSON Formatter</Link>
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
