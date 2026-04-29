import Link from "next/link";

export default function Hero() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

    return (
        <div className="container hero-section" id="home">
            <div className="row align-items-center">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="hero-text">
                        <p className="hero-greeting">Senior Full-Stack &amp; AI Engineer</p>
                        <h1 className="hero-name">Savan Padaliya</h1>
                        <p className="hero-subtitle">I build AI-powered web products fast.</p>
                        <p className="hero-desc">
                            For founders and product teams who need MVPs, automation, internal tools, and AI features shipped with senior-level execution.
                        </p>
                        <div className="hero-actions mt-4">
                            <a
                                href={calendlyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary-custom me-3"
                            >
                                Book a project call
                            </a>
                            <Link href="/#portfolio" className="btn-outline-custom">
                                View case studies
                            </Link>
                        </div>
                        <p className="hero-trust-cue">NDA available &middot; Your idea stays confidential</p>
                        <p className="hero-stack-cue">Node.js &middot; React &middot; OpenAI &middot; Gemini &middot; LangChain &middot; N8N</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="hero-image"></div>
                </div>
            </div>
        </div>
    );
}
