import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const QRCodeCanvas = dynamic(
  () => import('qrcode.react').then((m) => m.QRCodeCanvas),
  { ssr: false }
);

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'QR Code Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Free online QR code generator. Convert any URL or text to a QR code and download as PNG instantly. No sign-up required.',
      url: 'https://savanpadaliya.com/tools/qr-generator',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://savanpadaliya.com' },
      featureList: ['Generate QR code from any URL or text', 'Download as PNG', 'Copy encoded text to clipboard', 'No sign-up required'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a QR code?', acceptedAnswer: { '@type': 'Answer', text: 'A QR (Quick Response) code is a 2D barcode that can store up to 4,296 alphanumeric characters. Smartphones can decode QR codes using their camera, making them useful for sharing URLs, contact info, and text without typing.' } },
        { '@type': 'Question', name: 'What can I encode in a QR code?', acceptedAnswer: { '@type': 'Answer', text: 'URLs (most common), plain text, email addresses (mailto:), phone numbers (tel:), Wi-Fi credentials (WIFI:), and contact cards (vCard format).' } },
        { '@type': 'Question', name: 'Why do QR codes still work when partially damaged?', acceptedAnswer: { '@type': 'Answer', text: 'QR codes include Reed–Solomon error correction. Depending on the error correction level, they can withstand 7–30% data damage and still decode correctly. This is also why you can put a logo in the centre of a QR code.' } },
        { '@type': 'Question', name: 'How do I download the QR code as a PNG?', acceptedAnswer: { '@type': 'Answer', text: 'Enter your URL or text, click Generate, then click Download PNG. The tool saves the QR code canvas directly as a PNG image file.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is a QR code?', a: 'A QR (Quick Response) code is a 2D barcode that stores up to 4,296 alphanumeric characters. Smartphone cameras can decode them instantly, making them ideal for sharing URLs and text without typing.' },
  { q: 'What can I encode in a QR code?', a: 'URLs (most common), plain text, email addresses (mailto:), phone numbers (tel:), Wi-Fi credentials (WIFI:SSID:password;;), and vCard contact information.' },
  { q: 'Why do QR codes work even when partially damaged?', a: 'QR codes use Reed–Solomon error correction. Depending on the level chosen, they can withstand 7–30% data loss and still decode correctly — which is also why logos can be placed in the centre without breaking the code.' },
  { q: 'How do I download the QR code?', a: 'Enter your URL or text, click Generate, then click Download PNG. The tool converts the canvas element directly to a PNG image and triggers a browser download.' },
];

export default function QrGenerator() {
  const [input, setInput] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasWrapRef = useRef(null);

  function handleGenerate() {
    const trimmed = input.trim();
    if (!trimmed) { setError('Please enter a URL or text to generate a QR code.'); return; }
    setError('');
    setQrValue(trimmed);
  }

  function handleKeyDown(e) { if (e.key === 'Enter') handleGenerate(); }

  function handleDownload() {
    if (!canvasWrapRef.current) return;
    const canvas = canvasWrapRef.current.querySelector('canvas');
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  }

  function handleCopy() {
    if (!qrValue) return;
    navigator.clipboard.writeText(qrValue).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      <Head>
        <title>QR Code Generator — Free Online Tool | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Free QR code generator. Convert any URL or text to a QR code and download as PNG instantly. No sign-up required." />
        <meta name="keywords" content="QR code generator, free QR code, URL to QR code, online QR generator, QR PNG download" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://savanpadaliya.com/tools/qr-generator" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free QR Code Generator — Savan Padaliya" />
        <meta property="og:description" content="Convert any URL or text to a QR code. Download as PNG. Free and instant." />
        <meta property="og:url" content="https://savanpadaliya.com/tools/qr-generator" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Free QR Code Generator — Savan Padaliya" />
        <meta name="twitter:description" content="Convert any URL or text to a QR code. Download as PNG. Free and instant." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>QR Code Generator</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>QR Code Generator</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Enter a URL or any text to generate a QR code. Download as PNG — no sign-up required.</p>

            <div className="tool-card-ui">
              <div className="mb-3">
                <label className="tool-label" htmlFor="qr-input">URL or text</label>
                <div className="d-flex gap-2">
                  <input
                    id="qr-input"
                    type="text"
                    className="form-control"
                    placeholder="https://savanpadaliya.com"
                    value={input}
                    onChange={(e) => { setInput(e.target.value); setError(''); }}
                    onKeyDown={handleKeyDown}
                    style={{ borderRadius: 6 }}
                  />
                  <button className="btn-primary-custom px-4" style={{ whiteSpace: 'nowrap', flexShrink: 0 }} onClick={handleGenerate}>Generate</button>
                </div>
                {error && <p className="tool-error">{error}</p>}
              </div>
              {qrValue && (
                <>
                  <div className="qr-canvas-wrap" ref={canvasWrapRef}>
                    <QRCodeCanvas value={qrValue} size={220} bgColor="#ffffff" fgColor="#1a1a1a" level="M" />
                  </div>
                  <div className="d-flex gap-2 mt-3 justify-content-center flex-wrap">
                    <button className="btn-primary-custom px-4" onClick={handleDownload}>Download PNG</button>
                    <button className="btn-outline-custom px-4" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy text'}</button>
                  </div>
                  <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.75rem', wordBreak: 'break-all' }}>{qrValue}</p>
                </>
              )}
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Enter any URL or plain text in the input field and click Generate. The tool renders a QR code using the qrcode.react library entirely in your browser. Click Download PNG to save the canvas as an image file, or Copy text to copy the encoded value to your clipboard. No data is sent to any server."
              faqs={FAQS}
            />

            <div className="tool-more-section">
              <p className="tool-more-title">More free tools</p>
              <div className="d-flex gap-3 flex-wrap">
                <Link href="/tools/uuid-generator" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>UUID Generator</Link>
                <Link href="/tools/random-string" className="btn-outline-custom px-3 py-2" style={{ fontSize: '0.875rem' }}>Random String</Link>
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
