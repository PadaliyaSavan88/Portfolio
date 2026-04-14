import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Headers from './components/header'
import Hero from './components/hero'
import Services from './components/services'
import TechStack from './components/techStack'
import Projects from './components/projects'
import Contact from './components/contact'
import Footer from './components/footer'
import AboutUs from './components/about'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Savan Padaliya | Full Stack AI Engineer | NodeJS, React, OpenAI, Gemini</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Savan Padaliya | Full Stack AI Engineer | NodeJS, React, OpenAI, Gemini" />
        <meta name="description" content="Experienced Full Stack Engineer specializing in AI integrations, automation pipelines, and scalable web applications. Building intelligent products with OpenAI, Gemini, LangChain, and Google Cloud AI." />
        <meta name="keywords" content="Full Stack Developer, AI Engineer, NodeJS, React, Angular, OpenAI, Gemini, LangChain, Vertex AI, N8N, Automation, SaaS Development" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.savanpadaliya.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Savan Padaliya" />

        <meta property="og:title" content="Savan Padaliya | Full Stack AI Engineer | NodeJS, React, OpenAI, Gemini" />
        <meta property="og:site_name" content="Savan Padaliya | Full Stack AI Engineer" />
        <meta property="og:url" content="https://www.savanpadaliya.com/" />
        <meta property="og:description" content="Experienced Full Stack Engineer specializing in AI integrations, automation pipelines, and scalable web applications. Building intelligent products with OpenAI, Gemini, LangChain, and Google Cloud AI." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:creator" content="@padaliya_savan" />
        <meta name="twitter:title" content="Savan Padaliya | Full Stack AI Engineer | NodeJS, React, OpenAI, Gemini" />
        <meta name="twitter:description" content="Experienced Full Stack Engineer specializing in AI integrations, automation pipelines, and scalable web applications. Building intelligent products with OpenAI, Gemini, LangChain, and Google Cloud AI." />
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
                  "jobTitle": "Full Stack AI Engineer",
                  "url": "https://www.savanpadaliya.com",
                  "image": "https://www.savanpadaliya.com/graphics/header_logo.png",
                  "sameAs": [
                    "https://www.linkedin.com/in/savanpadaliya/",
                    "https://twitter.com/padaliya_savan"
                  ],
                  "knowsAbout": [
                    "JavaScript", "Node.js", "React", "Angular", "Next.js",
                    "AI Integration", "OpenAI API", "Gemini API", "Vertex AI",
                    "LangChain", "N8N", "Google ADK", "Docker", "Kubernetes",
                    "AWS", "Google Cloud", "SaaS Development"
                  ],
                  "description": "Full Stack AI Engineer with 4+ years of expertise specializing in AI integrations, scalable Node.js backend systems, and SaaS development.",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "professional inquiries",
                    "url": "https://www.linkedin.com/in/savanpadaliya/"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.savanpadaliya.com/#website",
                  "url": "https://www.savanpadaliya.com",
                  "name": "Savan Padaliya — Full Stack AI Engineer",
                  "description": "Portfolio and blog of Savan Padaliya, Full Stack AI Engineer.",
                  "publisher": { "@id": "https://www.savanpadaliya.com/#person" }
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://www.savanpadaliya.com/#profilepage",
                  "url": "https://www.savanpadaliya.com",
                  "name": "Savan Padaliya — Full Stack AI Engineer",
                  "about": { "@id": "https://www.savanpadaliya.com/#person" },
                  "mainEntity": { "@id": "https://www.savanpadaliya.com/#person" }
                }
              ]
            })
          }}
        />
      </Head>
      <Headers />
      <Hero />
      <Services />
      <TechStack />
      <Projects />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  )
}
