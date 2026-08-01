import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import CaseStudyTemplate from '../components/caseStudyTemplate';

export default function FoodDeliverySaasPlatform() {
    return (
        <>
            <Head>
                <title>Case Study: White-Label Food Delivery SaaS | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Going from developer to product owner on a white-label food delivery SaaS platform used by multiple businesses." />
                <link rel="canonical" href="https://savanpadaliya.com/case-studies/food-delivery-saas-platform" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Headers />
            <CaseStudyTemplate
                slug="food-delivery-saas-platform"
                name="A White-Label Food Delivery SaaS Platform"
                outcome="[ADD VERIFIED DETAIL — e.g. number of businesses on the platform, order volume]"
                tags={['SaaS', 'Scale', 'Backend Architecture']}
                context="A white-label food delivery SaaS platform that multiple businesses ran their operations on — not a single product, but infrastructure other companies depended on."
                problem="Multiple independent businesses needed to run their delivery operations on shared infrastructure, each with their own roadmap needs, while the platform itself had to keep shipping new features."
                challenge="Balancing a single shared codebase against the differing needs of multiple businesses running their operations on it, while sitting on architecture calls with clients across the world."
                role="Started as a MEAN stack developer and became the product owner for the platform within a couple of years — owning the roadmap, shipping new features, and making architecture decisions directly with clients."
                approach="[ADD VERIFIED DETAIL — specific technical approach to multi-tenancy and feature rollout]"
                architecture="[ADD VERIFIED DETAIL — system diagram, tech stack specifics beyond the MEAN stack]"
                keyDecisions="[ADD VERIFIED DETAIL — specific build-vs-buy or architecture calls made during this era]"
                outcomeDetail="[ADD VERIFIED DETAIL — concrete metrics: number of businesses served, order volume, uptime]"
                lessons="That shift — from writing features to being responsible for a product — changed how I think about software permanently. Ownership means looking at every feature through the lens of what it's actually for, not just whether it works."
            />
            <Footer />
        </>
    );
}
