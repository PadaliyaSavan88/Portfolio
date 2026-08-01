const questions = [
    "Should we build this feature now?",
    "Is our architecture going to scale?",
    "Do we actually need AI?",
    "Are we over-engineering our MVP?",
    "Should we hire developers or a CTO?",
    "Why is our product getting slower as we grow?",
];

export default function FounderProblem() {
    return (
        <div className="light-section" id="founder-problem">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                        <div className="section-title">
                            <h2>Building a startup is already hard.</h2>
                            <p className="section-subtitle">You shouldn&apos;t have to figure out every technical decision alone.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <ul className="founder-question-list">
                            {questions.map((q) => (
                                <li key={q}>{q}</li>
                            ))}
                        </ul>
                        <p className="founder-problem-closing">
                            These aren&apos;t just engineering questions.<br />
                            They&apos;re business decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
