import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Headers from './components/header';
import Footer from './components/footer';

const GdgAssistant = dynamic(() => import('./components/gdgAssistant'), { ssr: false });

export default function GdgAssistantPage() {
  return (
    <>
      <Head>
        <title>GDG Rajkot AI Assistant: Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ask an on-device Gemma 2 model (running via WebGPU) questions about GDG Rajkot and GDG Cloud Rajkot." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <span>GDG AI Assistant</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>GDG Rajkot AI Assistant</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>
              A local, on-device Gemma 2 assistant that answers questions about GDG Rajkot and GDG Cloud Rajkot, running entirely in your browser via WebGPU.
            </p>

            <GdgAssistant />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
