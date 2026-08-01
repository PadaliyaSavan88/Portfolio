import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import ServicePageTemplate from '../components/servicePageTemplate';

export default function AiForYourProduct() {
    return (
        <>
            <Head>
                <title>AI for Your Product | AI Product Development | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Don't add AI because everyone else is — add it because it creates leverage. AI product strategy, RAG systems, agents, and LLM integrations." />
                <meta name="keywords" content="AI product development, AI product consultant, AI SaaS development, RAG systems, AI agents, LLM integration" />
                <link rel="canonical" href="https://savanpadaliya.com/how-i-help/ai-for-your-product" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="AI for Your Product | Savan Padaliya" />
                <meta property="og:description" content="AI product strategy, RAG systems, agents, and workflow automation — added where it creates real leverage." />
                <meta property="og:url" content="https://savanpadaliya.com/how-i-help/ai-for-your-product" />
                <meta property="og:type" content="website" />
            </Head>
            <Headers />
            <ServicePageTemplate
                breadcrumbLabel="AI for Your Product"
                heading="Don't add AI because everyone else is."
                bodyCopy={['Add it because it creates leverage.']}
                sections={[
                    {
                        heading: 'Services',
                        items: ['AI product strategy', 'AI-powered features', 'RAG systems', 'AI agents', 'Workflow automation', 'Document intelligence', 'LLM integrations', 'AI architecture'],
                    },
                ]}
                philosophy={{
                    heading: 'Philosophy',
                    text: "The question isn't \"Where can we add AI?\" It's \"Where can AI create a measurable advantage?\"",
                }}
                ctaLabel="Explore AI for My Product"
                trackEventName="cta_ai_product"
            />
            <Footer />
        </>
    );
}
