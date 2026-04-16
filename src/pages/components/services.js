const services = [
    {
        num: "01",
        title: "Full Stack Development",
        for: "For startups & product teams",
        text: "Need features shipped fast without cutting corners? I build production-grade web apps and APIs in Node.js and React — clean architecture, real test coverage, ready to scale."
    },
    {
        num: "02",
        title: "AI Integration",
        for: "For teams adding intelligence",
        text: "Add AI capabilities your users will actually notice — smart chatbots, document processing, automated workflows, and LLM pipelines using OpenAI, Gemini, and LangChain."
    },
    {
        num: "03",
        title: "Rapid Prototyping",
        for: "For founders validating ideas",
        text: "Don't spend months building before you know it works. I'll prototype your core idea in days — real working software you can test with users and pitch to investors."
    },
    {
        num: "04",
        title: "Technical Consulting",
        for: "For businesses that need clarity",
        text: "Architecture review, tech stack decisions, AI adoption strategy — senior-level thinking without the senior hire. I'll tell you what to build, what to skip, and why."
    }
];

export default function Services() {
    return (
        <div className="dark-section">
            <div className="container">
                <div className="section-title">
                    <h2>What I Do</h2>
                    <p className="section-subtitle">Pick the engagement that fits where you are right now.</p>
                </div>
                <div className="row g-4 pb-4">
                    {services.map((s) => (
                        <div key={s.num} className="col-md-6 col-lg-3 d-flex">
                            <div className="service-card w-100">
                                <div className="service-card-num">{s.num}</div>
                                <span className="card-title">{s.title}</span>
                                <span className="service-card-for">{s.for}</span>
                                <p className="card-text">{s.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
