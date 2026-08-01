import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from 'react';
import Headers from './components/header';
import Footer from './components/footer';
import { trackEvent } from '@/lib/analytics';

const CONTACT_EMAIL = 'padaliyasavan8@gmail.com';

const stages = ['Idea', 'MVP', 'Early Traction', 'Growing', 'Scaling'];
const needs = ['Build', 'Scale', 'AI', 'Technical Leadership'];

export default function Contact() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';
    const startedRef = useRef(false);
    const [form, setForm] = useState({
        name: '', email: '', company: '', website: '',
        stage: '', need: '', about: '', goals: '',
    });
    const [submitted, setSubmitted] = useState(false);

    function markStarted() {
        if (!startedRef.current) {
            startedRef.current = true;
            trackEvent('contact_form_start');
        }
    }

    function update(field, value) {
        markStarted();
        setForm((f) => ({ ...f, [field]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const subject = `New inquiry from ${form.name || 'a founder'}${form.company ? ` (${form.company})` : ''}`;
        const bodyLines = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Company: ${form.company}`,
            `Website: ${form.website}`,
            `Stage: ${form.stage}`,
            `Needs help with: ${form.need}`,
            '',
            'About the product:',
            form.about,
            '',
            'What they want to achieve:',
            form.goals,
        ];
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
        trackEvent('contact_form_submit', { stage: form.stage, need: form.need });
        window.location.href = mailto;
        setSubmitted(true);
    }

    return (
        <>
            <Head>
                <title>Contact | Talk About Your Product | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Tell me what you're building. Whether you have an idea, a growing product, or a technical challenge, let's talk about your product." />
                <link rel="canonical" href="https://savanpadaliya.com/contact" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Contact | Savan Padaliya" />
                <meta property="og:description" content="Tell me what you're building — where you are, where you want to go, and what's getting in the way." />
                <meta property="og:url" content="https://savanpadaliya.com/contact" />
                <meta property="og:type" content="website" />
            </Head>
            <Headers />
            <div className="tool-page">
                <div className="container">
                    <div style={{ maxWidth: 640, margin: '0 auto' }}>
                        <nav className="tool-breadcrumb">
                            <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
                            <span>Contact</span>
                        </nav>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                            Tell me what you&apos;re building.
                        </h1>
                        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                            Have an idea, a product that&apos;s growing, or a technical challenge you&apos;re trying to solve?
                            Tell me where you are, where you want to go, and what&apos;s getting in the way.
                        </p>

                        {submitted ? (
                            <div className="tool-card-ui text-center">
                                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                                    Your email client should be open now.
                                </p>
                                <p style={{ color: '#6b7280', marginBottom: 0 }}>
                                    If it didn&apos;t open, email me directly at{' '}
                                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                                </p>
                            </div>
                        ) : (
                            <form className="tool-card-ui" onSubmit={handleSubmit}>
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="tool-label mb-2 d-block">Name</label>
                                        <input required className="form-control" value={form.name} onChange={(e) => update('name', e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="tool-label mb-2 d-block">Email</label>
                                        <input required type="email" className="form-control" value={form.email} onChange={(e) => update('email', e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="tool-label mb-2 d-block">Company / Startup</label>
                                        <input className="form-control" value={form.company} onChange={(e) => update('company', e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="tool-label mb-2 d-block">Website (optional)</label>
                                        <input className="form-control" value={form.website} onChange={(e) => update('website', e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="tool-label mb-2 d-block">Where are you today?</label>
                                        <select required className="form-select" value={form.stage} onChange={(e) => update('stage', e.target.value)}>
                                            <option value="" disabled>Select a stage</option>
                                            {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="tool-label mb-2 d-block">What do you need help with?</label>
                                        <select required className="form-select" value={form.need} onChange={(e) => update('need', e.target.value)}>
                                            <option value="" disabled>Select an area</option>
                                            {needs.map((n) => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="tool-label mb-2 d-block">Tell me about your product</label>
                                    <textarea required className="form-control" rows={4} value={form.about} onChange={(e) => update('about', e.target.value)} />
                                </div>

                                <div className="mb-4">
                                    <label className="tool-label mb-2 d-block">What would you like to achieve?</label>
                                    <textarea required className="form-control" rows={4} value={form.goals} onChange={(e) => update('goals', e.target.value)} />
                                </div>

                                <button type="submit" className="btn-primary-custom px-4 py-2">
                                    Start the Conversation
                                </button>
                            </form>
                        )}

                        <p className="text-center mt-4" style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                            Prefer to skip the form?{' '}
                            <a href={calendlyUrl} target="_blank" rel="noreferrer">Book directly on Calendly</a>.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
