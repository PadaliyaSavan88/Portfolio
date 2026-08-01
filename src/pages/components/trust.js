const proofPoints = [
    { num: "7+", label: "Years Building Products" },
    { num: "69.9M", label: "Citizens Served — Public Sector Platform" },
    { num: "5.0★", label: "Upwork Rating (5 Reviews)" },
];

export default function Trust() {
    return (
        <div className="light-section" id="trust">
            <div className="container">
                <div className="section-title">
                    <h2>Built products across different stages of scale.</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="community-stats">
                            {proofPoints.map((p) => (
                                <div key={p.label} className="community-stat">
                                    <span className="community-stat-num">{p.num}</span>
                                    <span className="community-stat-label">{p.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
