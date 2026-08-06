import dynamic from 'next/dynamic';
import Link from 'next/link';

const QRCodeCanvas = dynamic(
  () => import('qrcode.react').then((m) => m.QRCodeCanvas),
  { ssr: false }
);

const links = [
  { label: 'Try the live WebGPU demo', href: 'https://savanpadaliya.com/gdg-assistant', external: false },
  { label: 'Offline Gemma demo (Next.js source)', href: 'https://github.com/PadaliyaSavan88/Nextjs-gemma-chat', external: true },
  { label: 'JS boilerplate (Next.js + web-llm)', href: 'https://github.com/PadaliyaSavan88/Nextjs-gemma-chat', external: true },
  { label: 'Python boilerplate (FastAPI + Gemma)', href: 'https://github.com/PadaliyaSavan88/fastapi-gemma-chat', external: true },
];

export default function ResourcesWidget({ postUrl }) {
  return (
    <div className="resources-widget">
      <h3 className="resources-widget-heading">Session Resources</h3>
      <p className="resources-widget-sub">
        Slides, demos, and starter code from the talk, all in one place.
      </p>

      <a
        href="/resources/offline-ai-assistant-gemma-4-slides.pdf"
        download
        className="btn-primary-custom resources-widget-download"
      >
        Download the Slides (PDF)
      </a>

      <ul className="resources-widget-links">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noreferrer">{l.label} →</a>
            ) : (
              <Link href={l.href}>{l.label} →</Link>
            )}
          </li>
        ))}
      </ul>

      <div className="resources-widget-qr">
        <QRCodeCanvas value={postUrl} size={140} bgColor="#ffffff" fgColor="#1a1a1a" level="M" />
        <p className="resources-widget-qr-caption">Scan to come back to this page: deck, demos, and code all live here.</p>
      </div>
    </div>
  );
}
