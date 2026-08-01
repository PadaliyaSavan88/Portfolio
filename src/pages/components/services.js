import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const pillars = [
    {
        num: "BUILD",
        title: "Turn your idea into a product.",
        text: "From product architecture and MVP scope to development and launch.",
        quote: "“I have an idea. I need to build it.”",
        cta: "Build Your Product →",
        href: "/how-i-help/build-your-product",
        event: "cta_build_product"
    },
    {
        num: "SCALE",
        title: "Make your product ready for growth.",
        text: "Architecture reviews, performance, infrastructure, reliability, and technical debt.",
        quote: "“We have users. Our technology needs to catch up.”",
        cta: "Scale Your SaaS →",
        href: "/how-i-help/scale-your-saas",
        event: "cta_scale_saas"
    },
    {
        num: "AI",
        title: "Add AI where it creates real leverage.",
        text: "From AI-powered features and RAG to agents and workflow automation.",
        quote: "“We want to use AI, but we're not sure where it actually fits.”",
        cta: "Explore AI for Your Product →",
        href: "/how-i-help/ai-for-your-product",
        event: "cta_ai_product"
    },
    {
        num: "LEAD",
        title: "Get CTO-level technical leadership.",
        text: "Strategy, architecture, hiring, engineering processes, and technical decision-making.",
        quote: "“I need technical leadership, but I'm not ready for a full-time CTO.”",
        cta: "Explore Fractional CTO →",
        href: "/how-i-help/fractional-cto",
        event: "cta_fractional_cto"
    }
];

export default function Services() {
    return (
        <div className="dark-section" id="how-i-help">
            <div className="container">
                <div className="section-title">
                    <h2>Wherever your startup is, I can help you move forward.</h2>
                </div>
                <div className="row g-4 pb-4">
                    {pillars.map((s) => (
                        <div key={s.num} className="col-md-6 col-lg-3 d-flex">
                            <div className="service-card w-100 d-flex flex-column">
                                <div className="service-card-num">{s.num}</div>
                                <span className="card-title">{s.title}</span>
                                <p className="card-text">{s.text}</p>
                                <p className="service-card-for" style={{ fontStyle: 'italic' }}>{s.quote}</p>
                                <Link
                                    href={s.href}
                                    onClick={() => trackEvent(s.event)}
                                    className="btn-outline-custom mt-auto"
                                    style={{ fontSize: '0.875rem', alignSelf: 'flex-start' }}
                                >
                                    {s.cta}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
