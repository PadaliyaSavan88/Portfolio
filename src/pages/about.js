import Head from "next/head";
import Footer from "./components/footer";
import Headers from "./components/header";
import Link from "next/link";

export default function About() {
    return (
        <>
            <Head>
                <title>About Me - Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="title" content="About Me - Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer" />
                <meta name="description" content="Discover my journey as a passionate web developer, blockchain enthusiast, and JavaScript services provider. Learn about my interests, contributions to GDG Rajkot Chapter, and the services I offer in web development and blockchain projects." />
                <meta name="keywords" content="JavaScript Developer, Web Developer, NodeJS, React, Angular, Blockchain, Backend Development, Frontend Development, Deployment, Cloud Services, DevOps, Docker, Kubernetes, GDG Rajkot Chapter." />
                <meta name="language" content="English" />
                <link rel="canonical" href="https://www.savanpadaliya.com/about/" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Savan Padaliya" />

                <meta property="og:title" content="Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer" />
                <meta property="og:site_name" content="Savan Padaliya | Full Stack Blockchain developer" />
                <meta property="og:url" content="https://www.savanpadaliya.com/about/" />
                <meta property="og:description" content="Discover my journey as a passionate web developer, blockchain enthusiast, and JavaScript services provider. Learn about my interests, contributions to GDG Rajkot Chapter, and the services I offer in web development and blockchain projects." />
                <meta property="og:type" content="profile" />
                <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@padaliya_savan" />
                <meta name="twitter:creator" content="@padaliya_savan" />
                <meta name="twitter:title" content="About Savan Padaliya | Full Stack AI Engineer" />
                <meta name="twitter:description" content="Learn about Savan Padaliya — Full Stack AI Engineer specializing in AI integrations, Node.js backend systems, and SaaS development." />
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
                            "LangChain", "N8N", "Google ADK", "Docker", "Kubernetes"
                          ],
                          "description": "Full Stack AI Engineer with 4+ years of expertise specializing in AI integrations, scalable Node.js backend systems, and SaaS development."
                        },
                        {
                          "@type": "FAQPage",
                          "mainEntity": [
                            {
                              "@type": "Question",
                              "name": "What does Savan Padaliya specialize in?",
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Savan Padaliya specializes in Full Stack AI engineering — building scalable Node.js backend systems, integrating AI capabilities using OpenAI and Gemini APIs, and developing SaaS products."
                              }
                            },
                            {
                              "@type": "Question",
                              "name": "What AI technologies does Savan Padaliya work with?",
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Savan works with OpenAI API, Gemini API, Vertex AI, LangChain, N8N, and Google ADK to build AI-powered applications, chatbots, and automation pipelines."
                              }
                            },
                            {
                              "@type": "Question",
                              "name": "What services does Savan Padaliya offer?",
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Savan offers Web and Backend Development in Node.js, AI Integrations (chatbots, automation pipelines), SaaS Development, and Technical Consulting."
                              }
                            },
                            {
                              "@type": "Question",
                              "name": "How can I hire Savan Padaliya?",
                              "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "You can get in touch with Savan Padaliya via LinkedIn at https://www.linkedin.com/in/savanpadaliya/ or through his portfolio at https://www.savanpadaliya.com."
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

            <div className="about-section">
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Full Stack AI Engineer,<br />GDG Organiser &amp; Knowledge Sharer</h1>
                        <p className="mt-3" style={{ maxWidth: '680px', margin: '1rem auto 0', color: '#6b7280', lineHeight: '1.75' }}>
                            Welcome to my digital abode! I&apos;m Savan Padaliya, a Full Stack AI Engineer passionate about building intelligent products. I specialize in AI integrations, automation pipelines, and scalable web applications — bridging the gap between cutting-edge AI APIs and real-world product needs.
                        </p>
                    </div>
                </div>
            </div>

            <div className="about-content-dark">
                <div className="container">
                    <div className="section-title">
                        <h2>Crafting Digital Excellence</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '0.975rem' }}>
                                As a Full Stack AI Engineer, my expertise spans backend and frontend development with a sharp focus on AI integrations. I work with OpenAI, Gemini, Vertex AI, and LangChain to build intelligent features — from chatbots to automated content pipelines. Every solution I build is grounded in production readiness, scalability, and a commitment to delivering measurable impact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-content-light">
                <div className="container">
                    <div className="section-title">
                        <h2>Fueling Passion, Embracing Obsession</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <p style={{ color: '#4b5563', lineHeight: '1.8', fontSize: '0.975rem' }}>
                                Beyond building products, I am deeply passionate about the AI ecosystem. I enjoy speaking at tech events, writing about AI for developers, and experimenting with emerging tools like N8N, Google ADK, and MCP. I believe the next wave of software will be AI-native, and I&apos;m committed to staying at the forefront — and helping others get there too.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-cta">
                <div className="container">
                    <h2>Let&apos;s Build Something Remarkable</h2>
                    <p>Have a project in mind or just want to connect?</p>
                    <Link href="https://www.linkedin.com/in/savanpadaliya/" target="_blank" rel="noreferrer" className="btn-primary-custom me-3">Get In Touch</Link>
                    <Link href="/#portfolio" className="btn-outline-custom">View My Work</Link>
                </div>
            </div>

            <Footer />
        </>
    )
}
