import Head from 'next/head';
import Headers from '../components/header';
import Footer from '../components/footer';
import CaseStudyTemplate from '../components/caseStudyTemplate';

export default function AiDocumentIntelligencePlatform() {
    return (
        <>
            <Head>
                <title>Case Study: AI Document Intelligence Platform | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="How an enterprise document search problem evolved from basic context matching into a full semantic search and AI agent platform." />
                <link rel="canonical" href="https://savanpadaliya.com/case-studies/ai-document-intelligence-platform" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Headers />
            <CaseStudyTemplate
                slug="ai-document-intelligence-platform"
                name="AI-Powered Document Intelligence for Enterprise Search"
                outcome="Evolved from context matching to a full agentic AI platform"
                tags={['AI', 'Enterprise', 'Document Intelligence']}
                context="Organizations sitting on hundreds of thousands of documents had no good way to find what they needed, a real, recurring problem across enterprise and public sector clients."
                problem="Traditional keyword search wasn't surfacing the right documents, and teams were losing time hunting for information buried in large document repositories."
                challenge="Balancing search relevance and speed at scale, while the underlying approach itself needed to evolve. Starting with basic context matching wasn't going to be the end state."
                role="[ADD VERIFIED DETAIL: specific title/role, team structure]"
                approach="The system started with basic context matching, then evolved into semantic search with AI-generated document summaries."
                architecture="[ADD VERIFIED DETAIL: specific retrieval architecture, embedding/vector store choices, team workspace design]"
                keyDecisions="[ADD VERIFIED DETAIL: why semantic search over keyword search, why specific AI agent design]"
                outcomeDetail="The platform has grown into a full product with team workspaces and AI agents, evolving from a rough idea into something people actually depend on."
                lessons="Watching a product mature from a rough idea into something people depend on doesn't get old, and it reinforced that the right search approach depends on evolving with real usage, not guessing upfront."
            />
            <Footer />
        </>
    );
}
