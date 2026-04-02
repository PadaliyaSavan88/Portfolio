import Link from "next/link";

export default function Hero() {
    return (
        <div className="container hero-section" id="home">
            <div className="row align-items-center">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="hero-text">
                        <p className="hero-greeting">Hi, I&apos;m</p>
                        <h1 className="hero-name">Savan Padaliya</h1>
                        <p className="hero-subtitle">Full Stack AI Engineer</p>
                        <p className="hero-desc">
                            Building scalable backend systems in Node.js, intelligent web apps, and AI automation pipelines powered by OpenAI, Gemini, and LangChain.
                        </p>
                        <div className="hero-actions mt-4">
                            <Link href="/#portfolio" className="btn-primary-custom me-3">View My Work</Link>
                            <Link href="https://www.linkedin.com/in/savanpadaliya/" target="_blank" rel="noreferrer" className="btn-outline-custom">Get In Touch</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="hero-image"></div>
                </div>
            </div>
        </div>
    )
}
