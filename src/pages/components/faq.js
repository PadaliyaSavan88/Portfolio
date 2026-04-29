const faqs = [
    {
        id: "faq1",
        q: "What kinds of AI projects do you work on?",
        a: "Chatbot development, document workflows, LLM-powered product features, and workflow automation — primarily using OpenAI, Gemini, LangChain, and N8N. Most projects involve wiring AI into an existing product or building a net-new AI-first feature from scratch."
    },
    {
        id: "faq2",
        q: "Can you help build an MVP for a startup?",
        a: "Yes. Fast MVPs are one of the core services. The goal is a working, launchable product you can test with real users — not a prototype that needs a rewrite before it can go live."
    },
    {
        id: "faq3",
        q: "Do you work on existing products and backlogs?",
        a: "Yes. Whether you need a senior engineer to clear a backlog, add features, or improve an existing Node.js or React codebase, that's a standard engagement. I can slot in alongside your team or work independently."
    },
    {
        id: "faq4",
        q: "Can you add AI features to an existing Node.js or React app?",
        a: "Yes. Most AI integration work happens inside existing codebases — adding a chatbot, automating a workflow, or wiring an LLM into a feature you already have. No need to rebuild from scratch."
    },
    {
        id: "faq5",
        q: "Do you offer consulting before development starts?",
        a: "Yes. Architecture reviews, AI adoption strategy, and stack decisions are available as standalone consulting engagements before any code is written. If you're unsure what to build or how, that's exactly where to start."
    }
];

export default function FAQ() {
    return (
        <div className="light-section" id="faq">
            <div className="container">
                <div className="section-title">
                    <h2>Frequently asked questions</h2>
                    <p className="section-subtitle">Common questions from founders and product teams.</p>
                </div>
                <div className="row justify-content-center pb-4">
                    <div className="col-lg-8">
                        <div className="accordion" id="faqAccordion">
                            {faqs.map((faq, i) => (
                                <div className="accordion-item faq-item" key={faq.id}>
                                    <h3 className="accordion-header">
                                        <button
                                            className={`accordion-button faq-btn${i > 0 ? ' collapsed' : ''}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${faq.id}`}
                                            aria-expanded={i === 0 ? "true" : "false"}
                                            aria-controls={faq.id}
                                        >
                                            {faq.q}
                                        </button>
                                    </h3>
                                    <div
                                        id={faq.id}
                                        className={`accordion-collapse collapse${i === 0 ? ' show' : ''}`}
                                        data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body faq-body">{faq.a}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
