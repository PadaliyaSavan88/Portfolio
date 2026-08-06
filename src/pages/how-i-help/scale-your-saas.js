import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import ServicePageTemplate from '../components/servicePageTemplate';

export default function ScaleYourSaaS() {
    return (
        <>
            <Head>
                <title>Scale Your SaaS | Architecture & Growth | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Your product is growing. Is your technology ready? Architecture reviews, performance, infrastructure, and technical debt for growing SaaS businesses." />
                <meta name="keywords" content="SaaS architecture consulting, startup technical consultant, SaaS scaling, technical debt, cloud architecture" />
                <link rel="canonical" href="https://savanpadaliya.com/how-i-help/scale-your-saas" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Scale Your SaaS | Savan Padaliya" />
                <meta property="og:description" content="Identify what's actually holding your product back, and fix it without rebuilding everything." />
                <meta property="og:url" content="https://savanpadaliya.com/how-i-help/scale-your-saas" />
                <meta property="og:type" content="website" />
            </Head>
            <Headers />
            <ServicePageTemplate
                breadcrumbLabel="Scale Your SaaS"
                heading="Your product is growing. Is your technology ready?"
                bodyCopy={[
                    "Growth exposes problems that weren't visible at the beginning.",
                    'Slow APIs. Database bottlenecks. Rising cloud costs. Fragile deployments. Technical debt.',
                    "I help founders identify what's actually holding their product back, and fix it without rebuilding everything.",
                ]}
                sections={[
                    {
                        heading: 'Services',
                        items: ['Architecture review', 'Performance optimization', 'Database scaling', 'Cloud infrastructure', 'Reliability', 'Technical debt', 'AI integration', 'Cost optimization'],
                    },
                ]}
                ctaLabel="Scale My SaaS"
                trackEventName="cta_scale_saas"
            />
            <Footer />
        </>
    );
}
