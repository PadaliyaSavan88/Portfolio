const reasons = [
    {
        num: "01",
        heading: "Ship in weeks, not quarters — without the tech debt",
        body: "Speed without shortcuts — production code that's clean, scalable, and won't accumulate debt."
    },
    {
        num: "02",
        heading: "AI where it improves outcomes",
        body: "Not every problem needs an LLM. AI gets applied where it creates real leverage, not for the buzzword."
    },
    {
        num: "03",
        heading: "Prototype to production, no handoff gap",
        body: "One senior engineer from idea to launch — no translation loss, no undocumented decisions, no rewrites."
    },
    {
        num: "04",
        heading: "CTO-level judgment, without the full-time cost",
        body: "Architecture decisions, build-vs-buy calls, and roadmap clarity — the kind of judgment that usually costs you an equity stake."
    }
];

export default function WhyHireMe() {
    return (
        <div className="dark-section" id="why-hire-me">
            <div className="container">
                <div className="section-title">
                    <h2>Why teams hire me</h2>
                    <p className="section-subtitle">The difference between a developer who ships and one who thinks.</p>
                </div>
                <div className="row g-4 pb-4">
                    {reasons.map((r) => (
                        <div key={r.num} className="col-md-6 col-lg-3 d-flex">
                            <div className="service-card w-100">
                                <div className="service-card-num">{r.num}</div>
                                <span className="card-title">{r.heading}</span>
                                <p className="card-text">{r.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
