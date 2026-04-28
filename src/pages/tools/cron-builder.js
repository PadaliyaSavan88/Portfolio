import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Headers from '../components/header';
import Footer from '../components/footer';
import ToolSeo from '../components/tool-seo';

const PRESETS = [
  { label: 'Every minute',           value: '* * * * *' },
  { label: 'Every hour',             value: '0 * * * *' },
  { label: 'Every day at midnight',  value: '0 0 * * *' },
  { label: 'Every day at 9am',       value: '0 9 * * *' },
  { label: 'Every Monday at 9am',    value: '0 9 * * 1' },
  { label: '1st of every month',     value: '0 9 1 * *' },
  { label: 'Every weekday at 9am',   value: '0 9 * * 1-5' },
  { label: 'Every 15 minutes',       value: '*/15 * * * *' },
  { label: 'Every 6 hours',          value: '0 */6 * * *' },
  { label: 'Twice a day (9am & 6pm)',value: '0 9,18 * * *' },
];

const FIELDS = [
  { key: 'min',   label: 'Minute',  hint: '0–59, * / , -' },
  { key: 'hour',  label: 'Hour',    hint: '0–23, * / , -' },
  { key: 'dom',   label: 'Day',     hint: '1–31, * / , -' },
  { key: 'month', label: 'Month',   hint: '1–12, * / , -' },
  { key: 'dow',   label: 'Weekday', hint: '0–7 (0=Sun), * / , -' },
];

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function describeField(val, type) {
  if (val === '*') return null;
  if (val.startsWith('*/')) return `every ${val.slice(2)} ${type}${val.slice(2) !== '1' ? 's' : ''}`;
  if (val.includes(',')) return `at ${type}${type === 'minute' ? 's' : ''} ${val}`;
  if (val.includes('-')) return `from ${type} ${val}`;
  const n = parseInt(val);
  if (!isNaN(n)) {
    if (type === 'month') return `in ${MONTHS[n] || val}`;
    if (type === 'weekday') return `on ${DAYS[n] || val}`;
    return `at ${type} ${val}`;
  }
  return val;
}

function describe(fields) {
  const { min, hour, dom, month, dow } = fields;
  if ([min, hour, dom, month, dow].every((v) => v === '*')) return 'Every minute';

  const parts = [];

  if (min !== '*' && hour !== '*') {
    const m = parseInt(min);
    const h = parseInt(hour);
    if (!isNaN(m) && !isNaN(h)) {
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
      parts.push(`At ${h12}:${String(m).padStart(2, '0')} ${ampm}`);
    } else {
      const md = describeField(min, 'minute');
      const hd = describeField(hour, 'hour');
      if (md) parts.push(md);
      if (hd) parts.push(hd);
    }
  } else {
    const md = describeField(min, 'minute');
    const hd = describeField(hour, 'hour');
    if (md) parts.push(md);
    if (hd) parts.push(hd);
    if (!md && !hd) parts.push('every minute');
  }

  const dd = describeField(dom, 'day');
  const montd = describeField(month, 'month');
  const dowd = describeField(dow, 'weekday');

  if (dd) parts.push(dd);
  if (montd) parts.push(montd);
  if (dowd) parts.push(dowd);

  return parts.join(', ');
}

function validateField(val) {
  return /^[\d\*\/,\-]+$/.test(val);
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Cron Job Builder',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      description: 'Build cron job expressions visually with a live human-readable description. Choose from 10 presets or set individual minute, hour, day, month, and weekday fields. Free online cron builder.',
      url: 'https://www.savanpadaliya.com/tools/cron-builder',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: 'Savan Padaliya', url: 'https://www.savanpadaliya.com' },
      featureList: ['10 preset schedules', '5 individual field inputs with validation', 'Live human-readable description', 'Copy expression with one click'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a cron expression?', acceptedAnswer: { '@type': 'Answer', text: 'A cron expression is a string of five fields that describes a schedule for a recurring task. The fields represent: minute (0–59), hour (0–23), day of month (1–31), month (1–12), and day of week (0–7, where 0 and 7 both mean Sunday). Special characters like * (any), / (step), , (list), and - (range) allow complex schedules.' } },
        { '@type': 'Question', name: 'What does */ mean in a cron expression?', acceptedAnswer: { '@type': 'Answer', text: '*/n means "every n units". For example, */15 in the minute field means "every 15 minutes" and */2 in the hour field means "every 2 hours". It is a step value applied across the entire valid range.' } },
        { '@type': 'Question', name: 'How do I run a cron job on weekdays only?', acceptedAnswer: { '@type': 'Answer', text: 'Set the day-of-week field to 1-5, which represents Monday through Friday. For example, "0 9 * * 1-5" runs at 9:00 AM every weekday. In cron, 0 and 7 both represent Sunday, 1 is Monday, and 5 is Friday.' } },
        { '@type': 'Question', name: 'What is the difference between day-of-month and day-of-week in cron?', acceptedAnswer: { '@type': 'Answer', text: 'If both the day-of-month and day-of-week fields are set (not *), most cron implementations run the job when EITHER condition is true, not both. For example, "0 9 1 * 1" runs on the 1st of every month AND every Monday — not only on Mondays that fall on the 1st.' } },
      ],
    },
  ],
};

const FAQS = [
  { q: 'What is a cron expression?', a: 'A cron expression is a 5-field string describing a recurring schedule: minute (0–59), hour (0–23), day of month (1–31), month (1–12), and day of week (0–7, where 0 and 7 = Sunday). Special characters *, /, ,, and - allow complex schedules.' },
  { q: 'What does */ mean in a cron expression?', a: '*/n means "every n units". For example, */15 in the minute field means every 15 minutes, and */2 in the hour field means every 2 hours. It is a step value applied across the full valid range.' },
  { q: 'How do I run a cron job on weekdays only?', a: 'Set the day-of-week field to 1-5 (Monday through Friday). For example, "0 9 * * 1-5" runs at 9:00 AM every weekday. In cron, 0 and 7 both mean Sunday, 1 is Monday, and 5 is Friday.' },
  { q: 'What is the difference between day-of-month and day-of-week?', a: 'If both fields are set (not *), most cron implementations run when EITHER condition is true — not both. "0 9 1 * 1" runs on the 1st of every month AND every Monday, not only on Mondays that fall on the 1st.' },
];

export default function CronBuilder() {
  const [fields, setFields] = useState({ min: '*', hour: '*', dom: '*', month: '*', dow: '*' });
  const [preset, setPreset] = useState('');
  const [copied, setCopied] = useState(false);

  const expression = `${fields.min} ${fields.hour} ${fields.dom} ${fields.month} ${fields.dow}`;
  const errors = Object.fromEntries(FIELDS.map(({ key }) => [key, fields[key] && !validateField(fields[key])]));
  const hasError = Object.values(errors).some(Boolean);

  function handlePreset(val) {
    setPreset(val);
    if (!val) return;
    const parts = val.split(' ');
    setFields({ min: parts[0], hour: parts[1], dom: parts[2], month: parts[3], dow: parts[4] });
  }

  function handleField(key, val) {
    setFields((prev) => ({ ...prev, [key]: val || '*' }));
    setPreset('');
  }

  function handleCopy() {
    navigator.clipboard.writeText(expression).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <>
      <Head>
        <title>Cron Job Expression Builder — Free Online Tool | Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Build cron job expressions visually with a human-readable description. Choose from presets or set individual fields. Free online cron builder." />
        <meta name="keywords" content="cron builder, cron expression, cron generator, cron job, online cron, crontab" />
        <meta name="author" content="Savan Padaliya" />
        <link rel="canonical" href="https://www.savanpadaliya.com/tools/cron-builder" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cron Job Builder — Savan Padaliya" />
        <meta property="og:description" content="Build cron expressions visually with live human-readable descriptions. 10 presets included. Free, no sign-up." />
        <meta property="og:url" content="https://www.savanpadaliya.com/tools/cron-builder" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Cron Job Builder — Savan Padaliya" />
        <meta name="twitter:description" content="Build cron expressions visually with live human-readable descriptions. 10 presets. Free, no sign-up." />
      </Head>
      <Headers />
      <div className="tool-page">
        <div className="container">
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <nav className="tool-breadcrumb">
              <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
              <Link href="/tools">Tools</Link><span className="tool-breadcrumb-sep">/</span>
              <span>Cron Builder</span>
            </nav>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.35rem' }}>Cron Job Builder</h1>
            <p style={{ color: '#6b7280', marginBottom: 0 }}>Build cron expressions visually with a live human-readable description.</p>

            <div className="tool-card-ui mt-4">
              <div className="mb-4">
                <label className="tool-label mb-2 d-block">Presets</label>
                <select
                  className="form-control"
                  value={preset}
                  onChange={(e) => handlePreset(e.target.value)}
                  style={{ borderRadius: 8, fontSize: '0.875rem', maxWidth: 320 }}
                >
                  <option value="">— Choose a preset —</option>
                  {PRESETS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label} ({p.value})</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="tool-label mb-3 d-block">Fields</label>
                <div className="row g-3">
                  {FIELDS.map(({ key, label, hint }) => (
                    <div key={key} className="col">
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                        {label}
                      </label>
                      <input
                        className="form-control text-center"
                        value={fields[key]}
                        onChange={(e) => handleField(key, e.target.value)}
                        style={{
                          fontFamily: "'Courier New', monospace",
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: 8,
                          borderColor: errors[key] ? '#ef4444' : '#d1d5db',
                          padding: '0.6rem 0.5rem',
                        }}
                      />
                      <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: 4, textAlign: 'center' }}>{hint}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: '#1e1e1e',
                borderRadius: 10,
                padding: '1.25rem 1.5rem',
                marginBottom: 16,
              }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: '1.5rem', fontWeight: 700, color: '#3081D0', letterSpacing: '0.1em', marginBottom: 6 }}>
                  {expression}
                </div>
                {!hasError && (
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    {describe(fields)}
                  </div>
                )}
                {hasError && (
                  <div style={{ fontSize: '0.875rem', color: '#ef4444' }}>Invalid field value — use digits, *, /, , or -</div>
                )}
              </div>

              <button className="btn-outline-custom px-4" onClick={handleCopy} disabled={hasError}>
                {copied ? 'Copied!' : 'Copy Expression'}
              </button>
            </div>

            <ToolSeo
              schema={SCHEMA}
              howItWorks="Choose a preset from the dropdown to populate all five fields at once, or edit each field individually — Minute, Hour, Day of month, Month, and Weekday. Valid values include digits, * (any), / (step), , (list), and - (range). The expression updates live and the panel below it shows a human-readable English description of the schedule. Click Copy Expression to copy the final cron string to your clipboard. Field validation highlights errors in red before you copy."
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
