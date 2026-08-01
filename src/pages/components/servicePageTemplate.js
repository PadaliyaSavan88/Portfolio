import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function ServicePageTemplate({
    breadcrumbLabel,
    heading,
    bodyCopy = [],
    sections = [],
    bestFor = [],
    philosophy,
    ctaLabel,
    trackEventName,
}) {
    return (
        <div className="tool-page">
            <div className="container">
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <nav className="tool-breadcrumb">
                        <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
                        <Link href="/#how-i-help">How I Help</Link><span className="tool-breadcrumb-sep">/</span>
                        <span>{breadcrumbLabel}</span>
                    </nav>

                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem' }}>
                        {heading}
                    </h1>

                    {bodyCopy.map((p, i) => (
                        <p key={i} style={{ color: '#374151', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                            {p}
                        </p>
                    ))}

                    {sections.map((section) => (
                        <div key={section.heading} className="tool-card-ui mt-4">
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                                {section.heading}
                            </h2>
                            <ul className="founder-question-list" style={{ margin: 0 }}>
                                {section.items.map((item) => (
                                    <li key={item} style={{ fontWeight: 500 }}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {philosophy && (
                        <div className="tool-card-ui mt-4" style={{ textAlign: 'center' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.75rem' }}>
                                {philosophy.heading}
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
                                {philosophy.text}
                            </p>
                        </div>
                    )}

                    {bestFor.length > 0 && (
                        <div className="tool-card-ui mt-4">
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                                Best For
                            </h2>
                            <div className="d-flex flex-wrap gap-2">
                                {bestFor.map((item) => (
                                    <span key={item} className="stack-category-pill">{item}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-5">
                        <Link
                            href="/contact"
                            className="btn-primary-custom px-4 py-2"
                            onClick={() => trackEvent(trackEventName)}
                        >
                            {ctaLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
