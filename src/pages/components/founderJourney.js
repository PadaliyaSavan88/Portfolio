const stages = [
    { name: "IDEA", desc: "Validate the technical direction." },
    { name: "BUILD", desc: "Build the MVP." },
    { name: "LAUNCH", desc: "Get the product into users' hands." },
    { name: "GROW", desc: "Improve the product and infrastructure." },
    { name: "SCALE", desc: "Build the systems and team for what's next." },
];

export default function FounderJourney() {
    return (
        <div className="dark-section" id="founder-journey">
            <div className="container">
                <div className="section-title">
                    <h2>From first idea to your next stage of growth.</h2>
                </div>
                <div className="journey-stepper">
                    {stages.map((s, i) => (
                        <div key={s.name} className="journey-step">
                            <div className="journey-step-inner">
                                <span className="journey-step-name">{s.name}</span>
                                <p className="journey-step-desc">{s.desc}</p>
                            </div>
                            {i < stages.length - 1 && <span className="journey-step-connector" aria-hidden="true">→</span>}
                        </div>
                    ))}
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                        <p className="journey-closing">
                            You don&apos;t need the same technical strategy at every stage.
                        </p>
                        <p className="journey-closing">
                            My job is to help you make the right decisions for where you are now, and where you&apos;re going next.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
