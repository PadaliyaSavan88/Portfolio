import Head from 'next/head';
import Link from 'next/link';
import Headers from '../components/header';
import Footer from '../components/footer';

const caseStudies = [
    {
        slug: 'fuel-pricing-platform-at-national-scale',
        name: 'A National Fuel Pricing Platform at Public-Sector Scale',
        outcome: 'Serves 69.9 million citizens nationwide',
        tags: ['Scale', 'Public Sector', 'High Availability'],
    },
    {
        slug: 'ai-document-intelligence-platform',
        name: 'AI-Powered Document Intelligence for Enterprise Search',
        outcome: 'Evolved from context matching to a full agentic AI platform',
        tags: ['AI', 'Enterprise', 'Document Intelligence'],
    },
    {
        slug: 'food-delivery-saas-platform',
        name: 'A White-Label Food Delivery SaaS Platform',
        outcome: 'From developer to product owner, running a multi-business platform',
        tags: ['SaaS', 'Scale', 'Backend Architecture'],
    },
    {
        slug: 'ai-website-optimizer-mvp',
        name: 'AI Website Optimizer for SEO, AEO, and GEO Audits',
        outcome: 'Clients get a clear action list instead of guesswork',
        tags: ['AI', 'MVP', 'Product Development'],
    },
];

export default function CaseStudiesIndex() {
    return (
        <>
            <Head>
                <title>Case Studies | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Real problems, real technical challenges, and real outcomes — case studies from public sector scale to AI product MVPs." />
                <link rel="canonical" href="https://savanpadaliya.com/case-studies" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Headers />
            <div className="tools-page">
                <div className="container">
                    <div className="tools-header">
                        <h1 className="tools-page-title">Case Studies</h1>
                        <p className="tools-page-subtitle">Real problems. Real technical challenges. Real outcomes.</p>
                    </div>
                    <div className="row g-4">
                        {caseStudies.map((cs) => (
                            <div key={cs.slug} className="col-md-6 d-flex">
                                <div className="case-study-card w-100">
                                    <h3 className="case-study-title">{cs.name}</h3>
                                    <p className="case-study-val case-study-outcome">{cs.outcome}</p>
                                    <div className="project-tags mt-3 mb-3">
                                        {cs.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                                    </div>
                                    <Link href={`/case-studies/${cs.slug}`} className="btn-outline-custom">
                                        Read Case Study →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
