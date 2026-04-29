const services = [
    {
        num: "01",
        title: "Build production-ready web apps",
        for: "For startups & product teams",
        text: "Build reliable web apps and APIs in Node.js and React with scalable architecture, clean code, and maintainable foundations."
    },
    {
        num: "02",
        title: "Add AI where it creates leverage",
        for: "For teams adding intelligence",
        text: "Implement AI chatbots, document workflows, internal copilots, and LLM-powered product features that solve specific business problems."
    },
    {
        num: "03",
        title: "Validate ideas with working MVPs",
        for: "For founders validating ideas",
        text: "Turn product ideas into launchable MVPs and prototypes quickly so they can be tested, demoed, or shipped without long cycles."
    },
    {
        num: "04",
        title: "Get senior technical clarity",
        for: "For businesses that need clarity",
        text: "Support teams with architecture reviews, AI strategy, stack decisions, roadmap planning, and delivery guidance."
    }
];

export default function Services() {
    return (
        <div className="dark-section" id="services">
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
