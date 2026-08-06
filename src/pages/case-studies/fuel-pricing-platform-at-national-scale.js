import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import CaseStudyTemplate from '../components/caseStudyTemplate';

export default function FuelPricingPlatform() {
    return (
        <>
            <Head>
                <title>Case Study: National Fuel Pricing Platform | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="How a public sector fuel pricing platform was built to serve 69.9 million citizens nationwide: architecture, scale, and lessons." />
                <link rel="canonical" href="https://savanpadaliya.com/case-studies/fuel-pricing-platform-at-national-scale" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Headers />
            <CaseStudyTemplate
                slug="fuel-pricing-platform-at-national-scale"
                name="A National Fuel Pricing Platform at Public-Sector Scale"
                outcome="Serves 69.9 million citizens nationwide"
                tags={['Scale', 'Public Sector', 'High Availability']}
                context="A public sector client needed a platform where fuel stations across the country could submit updated fuel prices to a central portal, and citizens could look up the cheapest nearby fuel in real time."
                problem="Millions of citizens needed accurate, near-real-time fuel pricing information, submitted by fuel stations nationwide, with no tolerance for downtime or incorrect data at this scale."
                challenge="There is no staging environment that fully prepares a team for a system operating at the scale of 69.9 million citizens. The system had to be built right the first time, not discovered through failure."
                role="[ADD VERIFIED DETAIL: specific title/role on this project, team size, tenure]"
                approach="[ADD VERIFIED DETAIL: specific engineering approach taken to reach this scale]"
                architecture="[ADD VERIFIED DETAIL: system diagram, key services, and data flow between fuel stations, the central portal, and the citizen-facing lookup]"
                keyDecisions="[ADD VERIFIED DETAIL: why specific technology/architecture choices were made for this scale]"
                outcomeDetail="The system now serves 69.9 million citizens, enabling fuel stations to submit prices and citizens to find the cheapest fuel nearby."
                lessons="You either build it right, or you find out at the worst possible time. At this scale, there's no room for finding out the hard way."
            />
            <Footer />
        </>
    );
}
