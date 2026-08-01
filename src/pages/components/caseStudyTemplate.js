import { useEffect } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

function Section({ heading, children }) {
    if (!children) return null;
    return (
        <div className="mb-4">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>{heading}</h2>
            <div style={{ color: '#374151', fontSize: '1rem', lineHeight: 1.8 }}>{children}</div>
        </div>
    );
}

export default function CaseStudyTemplate({
    slug,
    name,
    outcome,
    tags = [],
    context,
    problem,
    challenge,
    role,
    approach,
    architecture,
    keyDecisions,
    outcomeDetail,
    lessons,
}) {
    useEffect(() => {
        trackEvent('case_study_view', { slug });
    }, [slug]);

    return (
        <div className="tool-page">
            <div className="container">
                <div style={{ maxWidth: 720, margin: '0 auto' }}>
                    <nav className="tool-breadcrumb">
                        <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
                        <Link href="/case-studies">Case Studies</Link><span className="tool-breadcrumb-sep">/</span>
                        <span>{name}</span>
                    </nav>

                    <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.75rem' }}>{name}</h1>
                    <p style={{ fontSize: '1.1rem', color: '#508D69', fontWeight: 600, marginBottom: '1rem' }}>{outcome}</p>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        {tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                    </div>

                    <div className="tool-card-ui">
                        <Section heading="Context">{context}</Section>
                        <Section heading="Problem">{problem}</Section>
                        <Section heading="Challenge">{challenge}</Section>
                        <Section heading="Role">{role}</Section>
                        <Section heading="Approach">{approach}</Section>
                        <Section heading="Architecture">{architecture}</Section>
                        <Section heading="Key Technical Decisions">{keyDecisions}</Section>
                        <Section heading="Outcome">{outcomeDetail}</Section>
                        <Section heading="Lessons">{lessons}</Section>
                    </div>

                    <div className="text-center mt-5">
                        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Have a similar problem?</p>
                        <Link
                            href="/contact"
                            className="btn-primary-custom px-4 py-2"
                            onClick={() => trackEvent('cta_talk_product')}
                        >
                            Talk About Your Product
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
