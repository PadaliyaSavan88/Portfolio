import Head from 'next/head'
import Headers from './components/header'
import Hero from './components/hero'
import SocialProof from './components/socialproof'
import Services from './components/services'
import TechStack from './components/techStack'
import Projects from './components/projects'
import Newsletter from './components/newsletter'
import Contact from './components/contact'
import Footer from './components/footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Savan Padaliya | Senior Full Stack Developer | AI-Powered Development</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Savan Padaliya | Senior Full Stack Developer | AI-Powered Development" />
        <meta name="description" content="Senior Full Stack Developer who ships faster with AI. I build production-grade web apps, AI integrations, and rapid prototypes for startups and businesses. Book a free call." />
        <meta name="keywords" content="Senior Full Stack Developer, AI Developer, Node.js, React, OpenAI, Gemini, LangChain, Rapid Prototyping, SaaS Development, Hire Developer" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.savanpadaliya.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Savan Padaliya" />

        <meta property="og:title" content="Savan Padaliya | Senior Full Stack Developer | AI-Powered Development" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:url" content="https://www.savanpadaliya.com/" />
        <meta property="og:description" content="Senior Full Stack Developer who ships faster with AI. Production-grade apps, AI integrations, and rapid prototypes. Book a free call." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Savan Padaliya | Senior Full Stack Developer | AI-Powered Development" />
        <meta name="twitter:description" content="Senior Full Stack Developer who ships faster with AI. Book a free call." />
        <meta name="twitter:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.savanpadaliya.com/#person",
                  "name": "Savan Padaliya",
                  "jobTitle": "Senior Full Stack Developer",
                  "url": "https://www.savanpadaliya.com",
                  "image": "https://www.savanpadaliya.com/graphics/header_logo.png",
                  "sameAs": [
                    "https://www.linkedin.com/in/savanpadaliya/",
                    "https://twitter.com/padaliya_savan"
                  ],
                  "knowsAbout": [
                    "JavaScript", "Node.js", "React", "Angular", "Next.js",
                    "AI Integration", "OpenAI API", "Gemini API", "Vertex AI",
                    "LangChain", "N8N", "Rapid Prototyping", "SaaS Development",
                    "Docker", "Kubernetes", "AWS", "Google Cloud"
                  ],
                  "description": "Senior Full Stack Developer with 4+ years of experience who uses AI to ship faster. Specializing in production web apps, AI integrations, and rapid prototyping.",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "professional inquiries",
                    "url": "https://www.linkedin.com/in/savanpadaliya/"
                  },
                  "hasOccupation": {
                    "@type": "Occupation",
                    "name": "Senior Full Stack Developer",
                    "occupationLocation": { "@type": "Country", "name": "India" },
                    "skills": "Node.js, React, Next.js, AI Integration, OpenAI, LangChain, TypeScript"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.savanpadaliya.com/#website",
                  "url": "https://www.savanpadaliya.com",
                  "name": "Savan Padaliya — Senior Full Stack Developer",
                  "description": "Portfolio of Savan Padaliya — Senior Full Stack Developer who ships faster with AI.",
                  "publisher": { "@id": "https://www.savanpadaliya.com/#person" }
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://www.savanpadaliya.com/#profilepage",
                  "url": "https://www.savanpadaliya.com",
                  "name": "Savan Padaliya — Senior Full Stack Developer",
                  "about": { "@id": "https://www.savanpadaliya.com/#person" },
                  "mainEntity": { "@id": "https://www.savanpadaliya.com/#person" }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What kind of developer is Savan Padaliya?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Savan is a Senior Full Stack Developer who uses AI tools to ship production-ready software faster. He specializes in Node.js, React, Next.js, and AI integrations with OpenAI, Gemini, and LangChain."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can Savan Padaliya build an MVP quickly?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Rapid prototyping is one of his core services — he has delivered working prototypes in as little as 5 days for clients who needed to validate ideas fast."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How can I hire Savan Padaliya?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can book a free 30-minute discovery call via Calendly, or send a message on LinkedIn. He's available for freelance, project-based, and consulting engagements."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is Savan Padaliya's Upwork rating?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Savan holds a 5.0 star rating on Upwork with multiple completed engagements across full stack development, TypeScript, and AI integrations."
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
      <TechStack />
      <Newsletter />
      <Contact />
      <Footer />
    </>
  )
}
