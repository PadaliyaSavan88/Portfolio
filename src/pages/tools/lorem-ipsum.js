import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'reprehenderit', 'voluptate', 'velit',
  'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat',
  'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde', 'omnis',
  'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque', 'laudantium',
  'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore',
  'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo',
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickRange(arr, min, max) {
  const n = min + Math.floor(Math.random() * (max - min + 1));
  return Array.from({ length: n }, () => pick(arr));
}

function generateWords(n) {
  return pickRange(LOREM_WORDS, n, n).join(' ');
}

function generateSentence() {
  const words = pickRange(LOREM_WORDS, 8, 15);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function generateParagraph(isFirst) {
  const sentences = Array.from({ length: 4 + Math.floor(Math.random() * 4) }, generateSentence);
  if (isFirst) {
    sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  }
  return sentences.join(' ');
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Lorem Ipsum Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Generate Lorem Ipsum placeholder text as paragraphs, sentences, or individual words. The first paragraph always starts with the classic "Lorem ipsum dolor sit amet..." opening. Free, no sign-up required.',
      url: 'https://www.savanpadaliya.com/tools/lorem-ipsum',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://www.savanpadaliya.com' },
      featureList: ['Paragraphs, sentences, or word list output', 'First paragraph starts with classic Lorem ipsum opener', 'Count control: 1–20 paragraphs/sentences, 10–500 words', 'One-click copy output'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is Lorem Ipsum?', acceptedAnswer: { '@type': 'Answer', text: 'Lorem ipsum is standard placeholder text used in publishing and graphic design since the 1500s. It is derived from "de Finibus Bonorum et Malorum" by Cicero (45 BC), but scrambled so it has no intelligible meaning — the lack of readable text helps reviewers focus on layout rather than content.' } },
        { '@type': 'Question', name: 'Why do designers use Lorem Ipsum instead of real text?', acceptedAnswer: { '@type': 'Answer', text: 'Placeholder text prevents reviewers from being distracted by the actual words when evaluating visual layout, typography, and spacing. Real text also tends to be too short, too long, or too meaningful — Lorem ipsum fills space without carrying any message.' } },
        { '@type': 'Question', name: 'How many words is a typical Lorem Ipsum paragraph?', acceptedAnswer: { '@type': 'Answer', text: 'A standard Lorem ipsum paragraph contains roughly 50–100 words, consisting of 4–8 sentences of 8–15 words each. This generator produces paragraphs in that range, with the first sentence of the first paragraph always being the classic "Lorem ipsum dolor sit amet..." opener.' } },
        { '@type': 'Question', name: 'Can I use Lorem Ipsum in production?', acceptedAnswer: { '@type': 'Answer', text: 'No — Lorem ipsum is only for prototyping and design mockups. It should always be replaced with real content before going live. Search engines cannot index meaningless placeholder text, and users cannot derive any value from it.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is Lorem Ipsum?', a: 'Lorem ipsum is placeholder text used in publishing and graphic design since the 1500s. Derived from Cicero\'s "de Finibus Bonorum et Malorum" (45 BC) and scrambled to be unreadable, it lets reviewers focus on layout rather than content.' },
  { q: 'Why do designers use Lorem Ipsum instead of real text?', a: 'Placeholder text prevents reviewers from being distracted by actual words when evaluating layout, typography, and spacing. Real text is often too short, too long, or too meaningful — Lorem ipsum fills space without carrying a message.' },
  { q: 'How many words is a typical paragraph?', a: 'A standard Lorem ipsum paragraph has roughly 50–100 words across 4–8 sentences of 8–15 words each. This generator uses that range, with the first sentence of the first paragraph always being the classic opener.' },
  { q: 'Can I use Lorem Ipsum in production?', a: 'No — it is only for prototyping and design mockups. Always replace it with real content before going live. Search engines cannot index meaningless placeholder text, and it provides no value to users.' },
];

export default function LoremIpsum() {
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  function generate() {
    let result = '';
    if (type === 'paragraphs') {
      result = Array.from({ length: count }, (_, i) => generateParagraph(i === 0)).join('\n\n');
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: count }, (_, i) =>
        i === 0 ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : generateSentence()
      );
      result = sentences.join(' ');
    } else {
      const n = Math.max(10, Math.min(500, count));
      result = generateWords(n);
    }
    setOutput(result);
  }

  function handleCopy() {
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const countLimits = type === 'words' ? [10, 500] : [1, 20];

  return (
    <>
      <Head>
        <title>Lorem Ipsum Generator — Paragraphs, Sentences & Words | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Generate Lorem Ipsum placeholder text — paragraphs, sentences, or words. Free online tool, no sign-up required." />
        <meta name="keywords" content="lorem ipsum generator, placeholder text, dummy text, lorem ipsum online, filler text" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://www.savanpadaliya.com/tools/lorem-ipsum" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lorem Ipsum Generator — Savan Padaliya" />
        <meta property="og:description" content="Generate Lorem Ipsum placeholder text as paragraphs, sentences, or words. Free, instant, no sign-up." />
        <meta property="og:url" content="https://www.savanpadaliya.com/tools/lorem-ipsum" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Lorem Ipsum Generator — Savan Padaliya" />
        <meta name="twitter:description" content="Generate Lorem Ipsum placeholder text as paragraphs, sentences, or words. Free and instant." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Lorem Ipsum</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Lorem Ipsum Generator</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Generate placeholder text — paragraphs, sentences, or words.</p>

            <div className="tool-card-ui mt-4">
              <div className="row g-3 align-items-end mb-4">
                <div className="col-auto">
                  <label className="tool-label mb-2 d-block">Type</label>
                  <div className="d-flex gap-2">
                    {[['paragraphs', 'Paragraphs'], ['sentences', 'Sentences'], ['words', 'Words']].map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => { setType(val); setCount(val === 'words' ? 50 : 3); setOutput(''); }}
                        style={{
                          padding: '0.4rem 1rem', borderRadius: 6, fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                          background: type === val ? '#3081D0' : '#fff',
                          color: type === val ? '#fff' : '#374151',
                          border: `1px solid ${type === val ? '#3081D0' : '#d1d5db'}`,
                        }}
                      >{label}</button>
                    ))}
                  </div>
                </div>
                <div className="col-auto">
                  <label className="tool-label mb-2 d-block">Count</label>
                  <input
                    type="number"
                    min={countLimits[0]}
                    max={countLimits[1]}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    style={{ width: 90, padding: '0.45rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 8, fontSize: '0.9rem' }}
                  />
                </div>
                <div className="col-auto">
                  <button className="btn-primary-custom px-4" onClick={generate}>Generate</button>
                </div>
              </div>

              {output && (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="tool-label mb-0">Output</p>
                    <button className="btn-outline-custom px-3 py-1" style={{ fontSize: '0.8rem' }} onClick={handleCopy}>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <textarea
                    className="form-control"
                    rows={12}
                    readOnly
                    value={output}
                    style={{ fontSize: '0.875rem', borderRadius: 8, background: '#f8f9fa', lineHeight: 1.7 }}
                  />
                </div>
              )}

              {!output && (
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', textAlign: 'center', padding: '1.5rem 0' }}>Click Generate to create placeholder text</p>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Select Paragraphs, Sentences, or Words mode, set the count, and click Generate. In Paragraphs mode the tool assembles 4–8 sentences of 8–15 words each, with the first paragraph always starting with the classic Lorem ipsum opener. In Sentences mode each sentence is independently generated. In Words mode a flat list of random lorem words is produced. All generation uses JavaScript Math.random() on a static 87-word classical lorem word bank. Nothing is sent to any server."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/markdown-previewer" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Markdown Previewer</Link>
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
