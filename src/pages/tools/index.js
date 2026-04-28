import Head from 'next/head';
import Link from 'next/link';
import Headers from '../components/header';
import Footer from '../components/footer';

const categories = [
  {
    name: 'Text & Data',
    tools: [
      { slug: 'json-formatter',    icon: '{}',  name: 'JSON Formatter',      description: 'Format, validate, or minify JSON with syntax highlighting.' },
      { slug: 'json-csv-converter',icon: '⇄',   name: 'JSON ↔ CSV',          description: 'Convert between JSON arrays and CSV format instantly.' },
      { slug: 'markdown-previewer',icon: 'MD',  name: 'Markdown Previewer',  description: 'Live side-by-side editor and rendered preview for Markdown.' },
      { slug: 'diff-checker',      icon: '±',   name: 'Diff Checker',        description: 'Paste two texts and see added, removed, and unchanged lines.' },
      { slug: 'case-converter',    icon: 'Aa',  name: 'Case Converter',      description: 'Convert text to camelCase, snake_case, PascalCase and more.' },
      { slug: 'base64',            icon: '64',  name: 'Base64 Encoder',      description: 'Encode plain text to Base64 or decode Base64 back to text.' },
      { slug: 'regex-tester',      icon: '.*',  name: 'Regex Tester',        description: 'Test regular expressions with live highlighting and a cheat sheet.' },
    ],
  },
  {
    name: 'Generators & Security',
    tools: [
      { slug: 'qr-generator',      icon: '⬛',  name: 'QR Code Generator',   description: 'Generate a QR code from any URL or text. Download as PNG.' },
      { slug: 'random-string',     icon: 'Rnd', name: 'Random String',       description: 'Cryptographically random strings for tokens, API keys, and secrets.' },
      { slug: 'password-generator',icon: '🔒',  name: 'Password Generator',  description: 'Generate strong passwords with a built-in strength meter.' },
      { slug: 'uuid-generator',    icon: 'ID',  name: 'UUID Generator',      description: 'Generate one or many UUID v4 identifiers. Copy all in one click.' },
      { slug: 'lorem-ipsum',       icon: '¶',   name: 'Lorem Ipsum',         description: 'Generate placeholder paragraphs, sentences, or word lists.' },
      { slug: 'bcrypt-generator',  icon: 'Bc',  name: 'Bcrypt Hash',         description: 'Hash passwords with bcrypt or verify a password against a hash.' },
      { slug: 'cron-builder',      icon: '*/5', name: 'Cron Builder',        description: 'Build cron expressions visually with a human-readable description.' },
    ],
  },
];

const allTools = categories.flatMap((c) => c.tools);

export default function ToolsIndex() {
  return (
    <>
      <Head>
        <title>Free Developer Tools — JSON, Regex, Base64, Password & More | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="14 free online developer tools — JSON formatter, Base64 encoder, regex tester, diff checker, password generator, UUID generator and more. No sign-up, no ads."
        />
        <meta name="keywords" content="free developer tools, JSON formatter, Base64 encoder, regex tester, diff checker, password generator, UUID generator, cron builder, lorem ipsum" />
        <link rel="canonical" href="https://www.savanpadaliya.com/tools/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Free Developer Tools — Savan Padaliya" />
        <meta property="og:description" content="14 free online developer tools — JSON, Base64, regex, diff, passwords, UUIDs and more. No sign-up required." />
        <meta property="og:url" content="https://www.savanpadaliya.com/tools/" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Free Developer Tools by Savan Padaliya',
              url: 'https://www.savanpadaliya.com/tools/',
              itemListElement: allTools.map((t, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: t.name,
                url: `https://www.savanpadaliya.com/tools/${t.slug}`,
              })),
            }),
          }}
        />
      </Head>
      <Headers />

      <div className="tools-page">
        <div className="container">
          <div className="tools-header">
            <h1 className="tools-page-title">Free Developer Tools</h1>
            <p className="tools-page-subtitle">
              Small, fast, client-side utilities. No sign-up, no tracking, no ads.
            </p>
          </div>

          {categories.map((cat) => (
            <div key={cat.name} className="mb-5">
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e8e8e8' }}>
                {cat.name}
              </h2>
              <div className="row g-4">
                {cat.tools.map((tool) => (
                  <div key={tool.slug} className="col-md-4 col-sm-6 d-flex">
                    <div className="service-card w-100 d-flex flex-column">
                      <span className="tool-icon" style={{ fontFamily: "'Courier New', monospace", fontSize: '1.1rem' }}>{tool.icon}</span>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: '#1a1a1a' }}>
                        {tool.name}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6, flexGrow: 1, marginBottom: 0 }}>
                        {tool.description}
                      </p>
                      <Link href={`/tools/${tool.slug}`} className="btn-primary-custom mt-3 text-center" style={{ fontSize: '0.875rem' }}>
                        Open Tool →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
