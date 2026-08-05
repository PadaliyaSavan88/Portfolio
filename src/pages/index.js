import Head from 'next/head'
import { getSortedPostsData } from '../../components/post'
import Headers from './components/header'
import Hero from './components/hero'
import Trust from './components/trust'
import FounderProblem from './components/founderProblem'
import Services from './components/services'
import FounderJourney from './components/founderJourney'
import WhyHireMe from './components/whyHireMe'
import Projects from './components/projects'
import Philosophy from './components/philosophy'
import InsightsTeaser from './components/insightsTeaser'
import TechStack from './components/techStack'
import FAQ from './components/faq'
import Contact from './components/contact'
import Footer from './components/footer'

export async function getStaticProps() {
  const posts = getSortedPostsData()
    .slice(0, 3)
    .map(({ id, title, date, topic }) => ({ id, title, date, topic }));

  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Savan Padaliya | Technical Partner for Startup Founders</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Savan Padaliya | Technical Partner for Startup Founders" />
        <meta name="description" content="I help startup founders build and scale technology products, from MVP to production and beyond. Product thinking, engineering depth, AI expertise, and experience at scale." />
        <meta name="keywords" content="technical partner for startup founders, fractional CTO, startup CTO consultant, AI product development, AI MVP development, SaaS MVP development, startup technical consultant, technical co-founder" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://savanpadaliya.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Savan Padaliya" />

        <meta property="og:title" content="Savan Padaliya | Technical Partner for Startup Founders" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:url" content="https://savanpadaliya.com/" />
        <meta property="og:description" content="I help startup founders build and scale technology products, from MVP to production and beyond. 7+ years building products across AI, SaaS, and cloud." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Savan Padaliya | Technical Partner for Startup Founders" />
        <meta name="twitter:description" content="I help startup founders build and scale technology products, from MVP to production and beyond." />
        <meta name="twitter:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://savanpadaliya.com/#person",
                  "name": "Savan Padaliya",
                  "alternateName": "Savan AI",
                  "jobTitle": "Technical Partner for Startup Founders",
                  "url": "https://savanpadaliya.com",
                  "image": "https://savanpadaliya.com/graphics/header_logo.png",
                  "sameAs": [
                    "https://www.linkedin.com/in/savanpadaliya/",
                    "https://twitter.com/padaliya_savan"
                  ],
                  "knowsAbout": [
                    "JavaScript", "Node.js", "React", "Angular", "Next.js",
                    "AI Integration", "OpenAI API", "Gemini API", "Vertex AI",
                    "LangChain", "N8N", "MVP Development", "AI Chatbot Development",
                    "Workflow Automation", "Technical Consulting", "Fractional CTO",
                    "Docker", "Kubernetes", "AWS", "Google Cloud"
                  ],
                  "description": "Technical Partner for Startup Founders with 7+ years of experience. Helps founders build MVPs, scale SaaS products, add AI where it creates leverage, and provides fractional CTO-level technical leadership.",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "professional inquiries",
                    "url": "https://www.linkedin.com/in/savanpadaliya/"
                  },
                  "hasOccupation": {
                    "@type": "Occupation",
                    "name": "Technical Partner for Startup Founders",
                    "occupationLocation": { "@type": "Country", "name": "India" },
                    "skills": "Node.js, React, Next.js, AI Integration, OpenAI, LangChain, TypeScript, MVP Development, Fractional CTO, Workflow Automation"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://savanpadaliya.com/#website",
                  "url": "https://savanpadaliya.com",
                  "name": "Savan Padaliya: Technical Partner for Startup Founders",
                  "description": "Savan Padaliya helps startup founders build and scale technology products, from MVP to production and beyond.",
                  "publisher": { "@id": "https://savanpadaliya.com/#person" }
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://savanpadaliya.com/#profilepage",
                  "url": "https://savanpadaliya.com",
                  "name": "Savan Padaliya: Technical Partner for Startup Founders",
                  "about": { "@id": "https://savanpadaliya.com/#person" },
                  "mainEntity": { "@id": "https://savanpadaliya.com/#person" }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What kinds of AI projects do you work on?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Chatbot development, document workflows, LLM-powered product features, and workflow automation — primarily using OpenAI, Gemini, LangChain, and N8N. Most projects involve wiring AI into an existing product or building a net-new AI-first feature from scratch."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can you help build an MVP for a startup?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Fast MVPs are one of the core services. The goal is a working, launchable product you can test with real users — not a prototype that needs a rewrite before it can go live."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you work on existing products and backlogs?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Whether you need a senior engineer to clear a backlog, add features, or improve an existing Node.js or React codebase, that's a standard engagement. I can slot in alongside your team or work independently."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can you add AI features to an existing Node.js or React app?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Most AI integration work happens inside existing codebases — adding a chatbot, automating a workflow, or wiring an LLM into a feature you already have. No need to rebuild from scratch."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you offer consulting before development starts?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Architecture reviews, AI adoption strategy, and stack decisions are available as standalone consulting engagements before any code is written. If you're unsure what to build or how, that's exactly where to start."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you offer fractional CTO services?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. For founders who need technical leadership but aren't ready for a full-time CTO, I offer fractional CTO engagements covering technology strategy, architecture, hiring, and roadmap planning."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </Head>
      <Headers />
      <Hero />
      <Trust />
      <FounderProblem />
      <Services />
      <FounderJourney />
      <WhyHireMe />
      <Projects />
      <Philosophy />
      <InsightsTeaser posts={posts} />
      <TechStack />
      <Contact />
      <FAQ />
      <Footer />
    </>
  )
}
