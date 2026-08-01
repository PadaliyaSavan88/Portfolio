import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import ServicePageTemplate from '../components/servicePageTemplate';

export default function FractionalCto() {
    return (
        <>
            <Head>
                <title>Fractional CTO | Technical Leadership for Startups | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Your startup needs technical leadership, not necessarily a full-time CTO. Fractional CTO support for founders — strategy, architecture, hiring, and roadmap." />
                <meta name="keywords" content="fractional CTO for startups, fractional CTO India, startup CTO consultant, technical co-founder" />
                <link rel="canonical" href="https://savanpadaliya.com/how-i-help/fractional-cto" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Fractional CTO | Savan Padaliya" />
                <meta property="og:description" content="Technology strategy, architecture, hiring, and engineering processes — for founders who need technical leadership without a full-time hire." />
                <meta property="og:url" content="https://savanpadaliya.com/how-i-help/fractional-cto" />
                <meta property="og:type" content="website" />
            </Head>
            <Headers />
            <ServicePageTemplate
                breadcrumbLabel="Fractional CTO"
                heading="Your startup needs technical leadership. Not necessarily a full-time CTO."
                bodyCopy={[
                    'I work with founders who need someone to own the technical direction of the business—from architecture and technology strategy to hiring engineers and building engineering processes.',
                ]}
                sections={[
                    {
                        heading: 'Areas',
                        items: ['Technology strategy', 'Architecture', 'Technical roadmap', 'Engineering team hiring', 'Developer evaluation', 'Vendor management', 'Technical debt', 'AI strategy', 'Security', 'Scalability'],
                    },
                ]}
                bestFor={['Non-technical founders', 'Startups preparing to hire engineers', 'Startups with existing development teams', 'Founders working with external agencies', 'Growing SaaS businesses']}
                ctaLabel="Talk About CTO Support"
                trackEventName="cta_fractional_cto"
            />
            <Footer />
        </>
    );
}
