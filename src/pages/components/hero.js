import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function Hero() {
    return (
        <div className="container hero-section" id="home">
            <div className="row align-items-center">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="hero-text">
                        <p className="hero-greeting">Savan Padaliya &middot; Technical Partner for Startup Founders</p>
                        <h1 className="hero-name">Your startup needs more than a developer.</h1>
                        <p className="hero-subtitle">
                            You need someone who can think about the product, the architecture, and what happens when your first 1,000 users become your next million.
                        </p>
                        <p className="hero-desc">
                            I help startup founders build and scale technology products—from MVP to production and beyond.
                        </p>
                        <div className="hero-actions mt-4">
                            <Link
                                href="/contact"
                                onClick={() => trackEvent('cta_talk_product')}
                                className="btn-primary-custom me-3"
                            >
                                Talk About Your Product
                            </Link>
                            <Link href="/#how-i-help" className="btn-outline-custom">
                                See How I Can Help
                            </Link>
                        </div>
                        <p className="hero-trust-cue">7+ years building products &middot; AI &middot; SaaS &middot; Cloud &middot; High-scale systems</p>
                        <p className="hero-stack-cue">NDA available &middot; Your idea stays confidential</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="hero-image"></div>
                </div>
            </div>
        </div>
    );
}
