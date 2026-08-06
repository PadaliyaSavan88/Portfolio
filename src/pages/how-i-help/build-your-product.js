import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import ServicePageTemplate from '../components/servicePageTemplate';

export default function BuildYourProduct() {
    return (
        <>
            <Head>
                <title>Build Your Product | MVP & Product Development | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Turn your startup idea into a launchable product. MVP scoping, architecture, development, and launch for AI products, SaaS MVPs, and new product lines." />
                <meta name="keywords" content="AI MVP development, SaaS MVP development, startup technical consultant, technical co-founder, MVP development" />
                <link rel="canonical" href="https://savanpadaliya.com/how-i-help/build-your-product" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Build Your Product | Savan Padaliya" />
                <meta property="og:description" content="Turn your startup idea into a launchable product, from MVP scope to development and launch." />
                <meta property="og:url" content="https://savanpadaliya.com/how-i-help/build-your-product" />
                <meta property="og:type" content="website" />
            </Head>
            <Headers />
            <ServicePageTemplate
                breadcrumbLabel="Build Your Product"
                heading="Have an idea? Let's turn it into a product."
                bodyCopy={[
                    "You don't need six months of development before discovering whether your idea works.",
                    "I help founders define the right MVP, make the right technical decisions, and build a product that can evolve as the business grows.",
                ]}
                sections={[
                    { heading: 'Process', items: ['Understand', 'Define', 'Architect', 'Build', 'Launch', 'Learn'] },
                ]}
                bestFor={['New startup ideas', 'AI products', 'SaaS MVPs', 'Internal tools becoming products', 'New product lines']}
                ctaLabel="Build My Product"
                trackEventName="cta_build_product"
            />
            <Footer />
        </>
    );
}
