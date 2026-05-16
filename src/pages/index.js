import Head from 'next/head'
import Headers from './components/header'
import Hero from './components/hero'
import SocialProof from './components/socialproof'
import Services from './components/services'
import Projects from './components/projects'
import WhyHireMe from './components/whyHireMe'
import TechStack from './components/techStack'
import FAQ from './components/faq'
import Newsletter from './components/newsletter'
import Contact from './components/contact'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Savan Padaliya | Ship Your AI Product Faster</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Savan Padaliya | Ship Your AI Product Faster" />
        <meta name="description" content="Founders and product teams hire Savan to ship MVPs in days, add AI features to existing products, and build software that scales. Node.js · React · OpenAI." />
        <meta name="keywords" content="hire AI engineer, ship AI product faster, MVP development, AI integration for SaaS, add AI to existing product, AI consulting for founders, full-stack AI developer, Node.js AI engineer, React developer for startups" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://savanpadaliya.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Savan Padaliya" />

        <meta property="og:title" content="Savan Padaliya | Ship Your AI Product Faster" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:url" content="https://savanpadaliya.com/" />
        <meta property="og:description" content="From 5-day MVP prototypes to systems serving 69.9M users. Senior Full-Stack & AI Engineer available for projects, consulting, and AI integrations." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Savan Padaliya | Ship Your AI Product Faster" />
        <meta name="twitter:description" content="Founders and product teams hire Savan to ship MVPs in days, add AI features to existing products, and build software that scales." />
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
                  "jobTitle": "Senior Full-Stack & AI Engineer",
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
                    "Workflow Automation", "Technical Consulting",
                    "Docker", "Kubernetes", "AWS", "Google Cloud"
                  ],
                  "description": "Senior Full-Stack & AI Engineer with 4+ years of experience. Helps founders, startups, and product teams build MVPs, AI features, automation systems, and scalable web applications.",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "professional inquiries",
                    "url": "https://www.linkedin.com/in/savanpadaliya/"
                  },
                  "hasOccupation": {
                    "@type": "Occupation",
                    "name": "Senior Full-Stack & AI Engineer",
                    "occupationLocation": { "@type": "Country", "name": "India" },
                    "skills": "Node.js, React, Next.js, AI Integration, OpenAI, LangChain, TypeScript, MVP Development, Workflow Automation"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://savanpadaliya.com/#website",
                  "url": "https://savanpadaliya.com",
                  "name": "Savan Padaliya — Senior Full-Stack & AI Engineer",
                  "description": "Portfolio of Savan Padaliya — Senior Full-Stack & AI Engineer for MVPs, web apps, AI chatbots, and automation systems.",
                  "publisher": { "@id": "https://savanpadaliya.com/#person" }
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://savanpadaliya.com/#profilepage",
                  "url": "https://savanpadaliya.com",
                  "name": "Savan Padaliya — Senior Full-Stack & AI Engineer",
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
      <SocialProof />
      <Services />
      <Projects />
      <WhyHireMe />
      <TechStack />
      <FAQ />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  )
}
