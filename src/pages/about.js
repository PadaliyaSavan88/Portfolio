import Head from "next/head";
import Footer from "./components/footer";
import Headers from "./components/header";
import Link from "next/link";

const chapters = [
    {
        period: "2019 — Final Year CS",
        title: "I didn't wait to graduate.",
        body: "While most of my classmates were still doing assignments, I was already deep in real client work — building a restaurant management system during my third year of engineering. It was messy, challenging, and exactly what I needed. That early experience taught me something most developers learn years later: real systems have real edge cases, and the only way to get good at building them is to build them."
    },
    {
        period: "2020 — 2022",
        title: "From developer to product owner.",
        body: "I started my career as a MEAN stack developer and moved fast. Within a couple of years I became the product owner for a food delivery SaaS — a white-label platform that multiple businesses ran their operations on. I was the one managing the roadmap, shipping new features, and sitting on architecture calls with clients across the world. It wasn't just code. It was ownership. That shift — from writing features to being responsible for a product — changed how I think about software permanently."
    },
    {
        period: "2022",
        title: "A detour into blockchain.",
        body: "When the blockchain wave hit, my organisation leaned into it and so did I. I got involved in case studies, architecture explorations, and ended up building both a decentralised exchange and a centralised exchange. It was a different class of engineering problems — consensus, on-chain logic, trust without intermediaries. I came out of it with a much deeper appreciation for distributed systems and what it takes to build software where the stakes of getting it wrong are very high."
    },
    {
        period: "2023",
        title: "The AI shift — and a problem worth solving.",
        body: "When AI started moving fast, I moved with it. I joined a firm focused on AI and public sector work. My first project was enterprise document search — a real problem: organisations sitting on hundreds of thousands of documents with no good way to find what they needed. We started with basic context matching, evolved it into semantic search with document summaries, and it has now grown into a full platform with team workspaces and AI agents. Watching a product mature from a rough idea into something people actually depend on — that never gets old."
    },
    {
        period: "2024 — Present",
        title: "69.9 million citizens. One system.",
        body: "The project that put scale into perspective for me was a public sector fuel pricing platform. Fuel stations across the country submit updated prices to a central portal. Citizens use it to find the cheapest fuel nearby. We built that system. Today it serves 69.9 million citizens. There is no staging environment that prepares you for that. You either build it right or you find out at the worst possible time. We built it right."
    }
];

const principles = [
    {
        title: "I think in products, not tickets.",
        text: "Years of owning a product means I look at every feature through the lens of what it's actually for — not just whether it works."
    },
    {
        title: "I've built at scale.",
        text: "From high-traffic SaaS to systems serving tens of millions of people. I know what decisions come back to haunt you and which ones are fine to defer."
    },
    {
        title: "AI is a tool, not a trend.",
        text: "I use AI to move faster on real problems — not to look current. Every engagement I take on benefits from that directly."
    }
];

export default function About() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/padaliyasavan/30min";

    return (
        <>
            <Head>
                <title>About Savan Padaliya | Senior Full Stack Developer | AI-Powered Development</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="title" content="About Savan Padaliya | Senior Full Stack Developer" />
                <meta name="description" content="The story of Savan Padaliya — Senior Full Stack Developer who went from building restaurant systems in college to shipping software that serves 69.9 million citizens. Now helping businesses ship faster with AI." />
                <meta name="keywords" content="Savan Padaliya, Senior Full Stack Developer, AI Developer, Node.js, React, Product Owner, SaaS, Blockchain, Enterprise Software" />
                <meta name="language" content="English" />
                <link rel="canonical" href="https://www.savanpadaliya.com/about/" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Savan Padaliya" />

                <meta property="og:title" content="About Savan Padaliya | Senior Full Stack Developer" />
                <meta property="og:site_name" content="Savan Padaliya" />
                <meta property="og:url" content="https://www.savanpadaliya.com/about/" />
                <meta property="og:description" content="From restaurant management systems in college to software serving 69.9 million citizens. The story of Savan Padaliya." />
                <meta property="og:type" content="profile" />
                <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@padaliya_savan" />
                <meta name="twitter:creator" content="@padaliya_savan" />
                <meta name="twitter:title" content="About Savan Padaliya | Senior Full Stack Developer" />
                <meta name="twitter:description" content="From restaurant management systems in college to software serving 69.9 million citizens." />
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
                                        "LangChain", "SaaS Development", "Blockchain", "Enterprise Software"
                                    ],
                                    "description": "Senior Full Stack Developer with 4+ years of experience building production systems — from SaaS products to public sector software serving 69.9 million citizens."
                                },
                                {
                                    "@type": "FAQPage",
                                    "mainEntity": [
                                        {
                                            "@type": "Question",
                                            "name": "What is Savan Padaliya's background?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Savan started building real client projects in his third year of Computer Science. He went on to become a product owner for a food delivery SaaS, explored blockchain (building both DEX and CEX systems), and now specialises in AI-powered development and enterprise software."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "What is the largest system Savan Padaliya has built?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Savan was part of the team that built a national fuel pricing platform for a public sector client. The system now serves 69.9 million citizens, enabling fuel stations to submit prices and citizens to find the cheapest fuel nearby."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "How can I work with Savan Padaliya?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "You can book a free 30-minute call via Calendly, or reach out on LinkedIn. Savan is available for freelance, project-based, and consulting engagements."
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

            {/* Page intro */}
            <div className="about-hero">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 text-center">
                            <p className="about-hero-label">The story so far</p>
                            <h1 className="about-hero-heading">
                                I&apos;ve been building real software since before I graduated.
                            </h1>
                            <p className="about-hero-sub">
                                4+ years. Multiple industries. Systems used by tens of millions of people.
                                Here&apos;s how I got here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story chapters */}
            <div className="about-chapters">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            {chapters.map((c, i) => (
                                <div key={i} className="chapter">
                                    <span className="chapter-period">{c.period}</span>
                                    <h2 className="chapter-title">{c.title}</h2>
                                    <p className="chapter-body">{c.body}</p>
                                    {i < chapters.length - 1 && <div className="chapter-divider" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Community */}
            <div className="about-community">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <span className="chapter-period">Beyond the code</span>
                            <h2 className="chapter-title">Building community, not just software.</h2>
                            <p className="chapter-body">
                                I organise <strong>GDG Rajkot</strong> — a Google Developer Group with 900+ active members.
                                We run bi-monthly events covering everything from AI and cloud to open source and career growth.
                                In the last year alone, we&apos;ve served 2,500+ participants across our events.
                            </p>
                            <p className="chapter-body mt-3">
                                Organising a community has made me a better developer. You learn fast when you have to explain things clearly,
                                invite the right speakers, and build something people keep coming back to. The teaching sharpens the thinking.
                            </p>
                            <div className="community-stats">
                                <div className="community-stat">
                                    <span className="community-stat-num">900+</span>
                                    <span className="community-stat-label">Active Members</span>
                                </div>
                                <div className="community-stat">
                                    <span className="community-stat-num">2,500+</span>
                                    <span className="community-stat-label">Participants / Year</span>
                                </div>
                                <div className="community-stat">
                                    <span className="community-stat-num">Bi‑monthly</span>
                                    <span className="community-stat-label">Events</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal */}
            <div className="about-personal">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <span className="chapter-period">When I&apos;m not coding</span>
                            <h2 className="chapter-title">Bikes, games, and good watches.</h2>
                            <p className="chapter-body">
                                I&apos;m an outdoors person at heart. On weekends you&apos;ll find me on a bike ride into the hills —
                                no destination, just roads and open sky. Exploring new places resets something in me that no amount of
                                coffee or focus music can.
                            </p>
                            <p className="chapter-body mt-3">
                                I also love gaming with friends — the kind that requires actual coordination and ends in someone blaming the lag.
                                And I&apos;m quietly obsessed with analogue and automatic watches — the engineering in a mechanical movement
                                is its own kind of beautiful.
                            </p>
                            <div className="personal-tags">
                                <span className="personal-tag">🏍 Bike Rides</span>
                                <span className="personal-tag">🎮 Gaming</span>
                                <span className="personal-tag">⌚ Watches</span>
                                <span className="personal-tag">🌿 Nature</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Principles */}
            <div className="about-principles">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <p className="principles-label">What this means for your project</p>
                            <div className="row g-4">
                                {principles.map((p, i) => (
                                    <div key={i} className="col-md-4">
                                        <div className="principle-card">
                                            <h3 className="principle-title">{p.title}</h3>
                                            <p className="principle-text">{p.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="about-cta">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="about-cta-heading">Let&apos;s build something together.</h2>
                            <p className="about-cta-sub">
                                Book a free 30-minute call. No pitch, no pressure —
                                just a conversation about what you&apos;re building.
                            </p>
                            <Link
                                href={calendlyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary-custom me-3"
                            >
                                Book a Free Call
                            </Link>
                            <Link
                                href="/#portfolio"
                                className="btn-outline-custom"
                            >
                                View My Work
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
