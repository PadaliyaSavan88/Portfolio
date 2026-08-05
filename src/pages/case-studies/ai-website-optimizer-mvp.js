import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import CaseStudyTemplate from '../components/caseStudyTemplate';

export default function AiWebsiteOptimizerMvp() {
    return (
        <>
            <Head>
                <title>Case Study: AI Website Optimizer for SEO/AEO/GEO | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Building an AI-powered audit tool that gives businesses actionable fixes for SEO, AEO, and GEO, from idea to MVP." />
                <link rel="canonical" href="https://savanpadaliya.com/case-studies/ai-website-optimizer-mvp" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Headers />
            <CaseStudyTemplate
                slug="ai-website-optimizer-mvp"
                name="AI Website Optimizer for SEO, AEO, and GEO Audits"
                outcome="Clients get a clear action list instead of guesswork"
                tags={['AI', 'MVP', 'Product Development']}
                context="Businesses couldn't tell why they weren't ranking in AI-driven search. No existing tooling addressed AEO/GEO (Answer Engine / Generative Engine Optimization) audits specifically."
                problem="Businesses couldn't tell why they weren't ranking in AI-driven search, and no existing tooling addressed AEO/GEO compatibility, only traditional SEO."
                challenge={'Turning a vague, emerging problem ("why don\'t we show up in AI search results?") into a concrete, actionable audit, on an extensible foundation for a problem space that\'s still evolving.'}
                role="[ADD VERIFIED DETAIL: solo build vs. team, exact scope of involvement]"
                approach="Built an intelligent audit bot that crawls sites and returns specific, actionable fixes for SEO, AEO, and GEO compatibility, built on LangChain for extensibility."
                architecture="A site crawler feeding into a LangChain-based analysis pipeline, using the OpenAI API and Gemini API to generate audit findings. [ADD VERIFIED DETAIL: full architecture diagram, specific data flow]"
                keyDecisions="Built on LangChain specifically for extensibility, anticipating that AEO/GEO audit criteria would keep evolving as AI search itself changes."
                outcomeDetail="Clients got a clear, actionable list of fixes instead of guesswork about why they weren't ranking in AI-driven search."
                lessons="[ADD VERIFIED DETAIL: what was learned building an AI product for an emerging, still-evolving problem space]"
            />
            <Footer />
        </>
    );
}
