import Link from "next/link";

const caseStudies = [
    {
        slug: "whatsapp-ai-chatbot",
        label: "AI Automation",
        title: "WhatsApp AI Chatbot",
        problem: "A business was losing leads after hours — no one available to qualify or respond.",
        solution: "Built a 24/7 AI-powered WhatsApp bot that qualifies leads, answers FAQs, and routes conversations using N8N + OpenAI.",
        outcome: "Response time dropped to instant. Lead qualification automated end-to-end.",
        tags: ["N8N", "OpenAI API", "Node.js", "WhatsApp API"]
    },
    {
        slug: "ai-website-optimizer",
        label: "AI Product",
        title: "AI Website Optimizer",
        problem: "Businesses couldn't tell why they weren't ranking in AI-driven search — no tooling existed for AEO/GEO audits.",
        solution: "Built an intelligent audit bot that crawls sites and returns specific, actionable fixes for SEO, AEO, and GEO compatibility.",
        outcome: "Clients got a clear action list instead of guesswork. Built on LangChain for extensibility.",
        tags: ["LangChain", "OpenAI API", "Node.js", "Gemini API"]
    },
    {
        slug: "video-streaming-platform",
        label: "Scalable Platform",
        title: "Video Streaming Platform",
        problem: "A streaming product needed real-time data handling, fast search, and smooth playback at scale.",
        solution: "Full-stack platform with Apache Kafka for real-time event streaming, Redis caching, and actor/genre/director-based search.",
        outcome: "Production-ready platform handling concurrent streams with no buffering issues.",
        tags: ["React", "Node.js", "Kafka", "Redis"]
    },
    {
        slug: "ecommerce-platform",
        label: "E-commerce",
        title: "E-commerce Platform",
        problem: "A stationery brand needed an online store — fast — with multiple product images and reliable checkout.",
        solution: "Built a complete storefront with category browsing, multi-image products, and Stripe payment integration.",
        outcome: "Shipped to production and processing real orders within weeks of kickoff.",
        tags: ["React", "Node.js", "Stripe", "MongoDB"]
    }
];

export default function Projects() {
    return (
        <div className="light-section" id="portfolio">
            <div className="container">
                <div className="section-title">
                    <h2>Case Studies</h2>
                    <p className="section-subtitle">Real problems. Real solutions. Real outcomes.</p>
                </div>
                <div className="row g-4 pb-4">
                    {caseStudies.map((p) => (
                        <div key={p.slug} className="col-md-6 d-flex">
                            <div className="case-study-card w-100">
                                <div className="case-study-label">{p.label}</div>
                                <h3 className="case-study-title">{p.title}</h3>
                                <div className="case-study-row">
                                    <div className="case-study-col">
                                        <span className="case-study-key">Problem</span>
                                        <p className="case-study-val">{p.problem}</p>
                                    </div>
                                </div>
                                <div className="case-study-row">
                                    <div className="case-study-col">
                                        <span className="case-study-key">Solution</span>
                                        <p className="case-study-val">{p.solution}</p>
                                    </div>
                                </div>
                                <div className="case-study-row">
                                    <div className="case-study-col">
                                        <span className="case-study-key">Outcome</span>
                                        <p className="case-study-val case-study-outcome">{p.outcome}</p>
                                    </div>
                                </div>
                                <div className="project-tags mt-3">
                                    {p.tags.map((tag) => (
                                        <span key={tag} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
