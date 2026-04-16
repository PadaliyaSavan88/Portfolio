import Link from "next/link";

export default function Hero() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

    return (
        <div className="container hero-section" id="home">
            <div className="row align-items-center">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="hero-text">
                        <p className="hero-greeting">Senior Full Stack Developer</p>
                        <h1 className="hero-name">Savan Padaliya</h1>
                        <p className="hero-subtitle">I ship faster with AI.</p>
                        <p className="hero-desc">
                            Got an idea, a backlog, or a broken system? I turn it into
                            working software — using AI to move at a speed your team will notice.
                        </p>
                        <div className="hero-actions mt-4">
                            <a
                                href={calendlyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary-custom me-3"
                            >
                                Book a Free Call
                            </a>
                            <Link href="/#portfolio" className="btn-outline-custom">
                                View My Work
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="hero-image"></div>
                </div>
            </div>
        </div>
    );
}
