const projects = [
    {
        title: "WhatsApp AI Chatbot",
        text: "Built an AI-powered WhatsApp automation bot for customer support and lead qualification. Uses N8N for workflow orchestration with OpenAI for natural language understanding.",
        tags: ["N8N", "OpenAI API", "Node.js", "WhatsApp API"]
    },
    {
        title: "AI Website Optimizer",
        text: "Developed an intelligent bot that audits websites and suggests actionable changes for SEO, AEO, and GEO compatibility, helping businesses rank better in AI-powered search engines.",
        tags: ["LangChain", "OpenAI API", "Node.js", "Gemini API"]
    },
    {
        title: "Video Streaming Platform",
        text: "Streaming platform for full-length movies with actor, director, and genre-based search. Integrated Apache Kafka for real-time data streaming and smooth playback.",
        tags: ["React", "Node.js", "Kafka", "Redis"]
    },
    {
        title: "E-commerce Platform",
        text: "Built a full-featured e-commerce website for stationery products with category-based browsing, multiple product images, and Stripe as the payment gateway.",
        tags: ["React", "Node.js", "Stripe", "MongoDB"]
    }
];

export default function Projects() {
    return (
        <div className="dark-section" id="portfolio">
            <div className="container">
                <div className="section-title">
                    <h2>The Projects I&apos;ve Shaped and Strengthened</h2>
                </div>
                <div className="row g-4 pb-4">
                    {projects.map((p) => (
                        <div key={p.title} className="col-md-6 d-flex">
                            <div className="project-card w-100">
                                <span className="card-title">{p.title}</span>
                                <p className="card-text">{p.text}</p>
                                <div className="project-tags">
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
    )
}
