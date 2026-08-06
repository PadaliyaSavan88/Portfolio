const reasons = [
    {
        num: "01",
        heading: "Product Thinking",
        body: "I don't start with \"What technology should we use?\" I start with \"What are we trying to achieve?\""
    },
    {
        num: "02",
        heading: "Engineering Depth",
        body: "I've worked across backend systems, SaaS, cloud infrastructure, AI, distributed systems, and high-scale platforms."
    },
    {
        num: "03",
        heading: "Scale Experience",
        body: "I've seen systems evolve from early products to platforms serving millions of users."
    },
    {
        num: "04",
        heading: "AI-Native Mindset",
        body: "I understand where AI creates genuine product leverage, and where it's just a buzzword."
    },
    {
        num: "05",
        heading: "One Technical Partner",
        body: "From architecture to implementation, you don't have to keep translating your vision between multiple technical teams."
    }
];

export default function WhyHireMe() {
    return (
        <div className="dark-section" id="why-work-with-me">
            <div className="container">
                <div className="section-title">
                    <h2>More than a developer. More than a consultant.</h2>
                </div>
                <div className="row g-4 pb-4 justify-content-center">
                    {reasons.map((r) => (
                        <div key={r.num} className="col-md-6 col-lg-4 d-flex">
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
