import Head from "next/head";
import Headers from "./components/header";
import Footer from "./components/footer";
import Link from "next/link";

const mentoringOffers = [
    {
        num: "01",
        title: "Quick Chat",
        duration: "30 min",
        price: "Free",
        desc: "Ask anything about your career, a technical decision, or a code problem you're stuck on. Zero agenda, zero pressure.",
    },
    {
        num: "02",
        title: "Career Guidance",
        duration: "30 min",
        price: "₹88",
        desc: "Resume review, job strategy, skill roadmap, or switching roles — a structured conversation tailored to where you are right now.",
    },
    {
        num: "03",
        title: "1:1 Mentorship Package",
        duration: "Flexible",
        price: "₹88",
        desc: "Ongoing support across multiple sessions. Good if you're in a transition phase and want consistent guidance from someone who's done it.",
    },
];

const consultingOffers = [
    {
        title: "Discovery Call",
        tag: "For professionals & businesses",
        duration: "30 min · Free",
        desc: "Got a product to build, a team that needs a senior hand, or an AI integration to scope out? Let's spend 30 minutes on it.",
        points: [
            "Project scoping & estimation",
            "Technical architecture review",
            "Freelance & consulting engagements",
            "NDA available — your idea stays confidential",
        ],
        cta: "Book on Calendly",
        urlKey: "calendly",
    },
    {
        title: "AWS / Infrastructure Guidance",
        tag: "For teams on AWS",
        duration: "15 min · ₹188",
        desc: "Cloud setup, infra review, or architecture decisions. 15 focused minutes on your specific AWS challenge.",
        points: [
            "EC2, S3, Lambda, RDS setup",
            "Architecture & cost review",
            "Deployment pipelines & CI/CD",
            "Scaling and reliability advice",
        ],
        cta: "Book on Topmate",
        urlKey: "topmate",
    },
];

export default function Topmate() {
    const topmateUrl = process.env.NEXT_PUBLIC_TOPMATE_URL || "#";
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

    function getUrl(key) {
        return key === "calendly" ? calendlyUrl : topmateUrl;
    }

    return (
        <>
            <Head>
                <title>Work with Savan Padaliya | 1:1 Mentoring & Consulting</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="title" content="Work with Savan Padaliya | 1:1 Mentoring & Consulting" />
                <meta
                    name="description"
                    content="Book a 1:1 mentoring or consulting session with Savan Padaliya — Senior Full Stack Developer. Career guidance, AWS, AI, and project consulting."
                />
                <meta
                    name="keywords"
                    content="Savan Padaliya, 1:1 mentoring, career guidance, AWS consulting, full stack developer, book a session, topmate"
                />
                <meta name="language" content="English" />
                <link rel="canonical" href="https://savanpadaliya.com/topmate" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Savan Padaliya" />

                <meta property="og:title" content="Work with Savan Padaliya | 1:1 Mentoring & Consulting" />
                <meta property="og:site_name" content="Savan Padaliya" />
                <meta property="og:url" content="https://savanpadaliya.com/topmate" />
                <meta
                    property="og:description"
                    content="Book a 1:1 session with Savan — career guidance, AWS infrastructure, or project consulting. Free sessions available."
                />
                <meta property="og:type" content="profile" />
                <meta property="og:image" content="https://savanpadaliya.com/graphics/header_logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@padaliya_savan" />
                <meta name="twitter:creator" content="@padaliya_savan" />
                <meta name="twitter:title" content="Work with Savan Padaliya | 1:1 Mentoring & Consulting" />
                <meta
                    name="twitter:description"
                    content="Book a 1:1 session with Savan — career guidance, AWS infrastructure, or project consulting. Free sessions available."
                />
                <meta name="twitter:image" content="https://savanpadaliya.com/graphics/header_logo.png" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Person",
                                    "@id": "https://savanpadaliya.com/#person",
                                    "name": "Savan Padaliya",
                                    "jobTitle": "Senior Full Stack Developer",
                                    "url": "https://savanpadaliya.com",
                                    "image": "https://savanpadaliya.com/graphics/header_logo.png",
                                    "sameAs": [
                                        "https://www.linkedin.com/in/savanpadaliya/",
                                        "https://twitter.com/padaliya_savan",
                                        "https://topmate.io/savan_padaliya/",
                                    ],
                                },
                                {
                                    "@type": "Service",
                                    "provider": { "@id": "https://savanpadaliya.com/#person" },
                                    "name": "1:1 Developer Mentoring",
                                    "description":
                                        "Career guidance, code review, and technical advice sessions for developers.",
                                    "offers": [
                                        { "@type": "Offer", "name": "Quick Chat", "price": "0", "priceCurrency": "INR" },
                                        { "@type": "Offer", "name": "Career Guidance", "price": "88", "priceCurrency": "INR" },
                                        { "@type": "Offer", "name": "1:1 Mentorship Package", "price": "88", "priceCurrency": "INR" },
                                    ],
                                },
                                {
                                    "@type": "Service",
                                    "provider": { "@id": "https://savanpadaliya.com/#person" },
                                    "name": "Technical Consulting",
                                    "description":
                                        "Project scoping, AWS infrastructure guidance, and AI integration consulting.",
                                    "offers": [
                                        { "@type": "Offer", "name": "Discovery Call", "price": "0", "priceCurrency": "INR" },
                                        { "@type": "Offer", "name": "AWS Infrastructure Guidance", "price": "188", "priceCurrency": "INR" },
                                    ],
                                },
                            ],
                        }),
                    }}
                />
            </Head>

            <Headers />

            {/* Hero */}
            <div className="about-hero">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 text-center">
                            <p className="about-hero-label">Work with me</p>
                            <h1 className="about-hero-heading">
                                Senior Full Stack Developer.<br />
                                Here to help you grow or ship.
                            </h1>
                            <p className="about-hero-sub">
                                Whether you&apos;re a developer figuring out your next move or a team that needs a senior
                                hand — I&apos;ve been on both sides. Book a session below.
                            </p>
                            <div className="topmate-trust-row">
                                <span className="topmate-trust-badge">⭐ 5/5 on Topmate · 4 reviews</span>
                                <span className="topmate-trust-sep">·</span>
                                <span className="topmate-trust-badge">⭐ 5.0 on Upwork · 5+ reviews</span>
                            </div>
                            <div className="mt-4">
                                <a
                                    href={topmateUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary-custom me-3"
                                >
                                    Book a free session
                                </a>
                                <a
                                    href={calendlyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-outline-custom"
                                >
                                    Book a project call
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1:1 Mentoring */}
            <div className="dark-section" id="mentoring">
                <div className="container">
                    <div className="section-title">
                        <h2>1:1 Sessions on Topmate</h2>
                        <p className="section-subtitle">For developers — career questions, code help, job transitions.</p>
                    </div>
                    <div className="row g-4 pb-4">
                        {mentoringOffers.map((offer) => (
                            <div key={offer.num} className="col-md-6 col-lg-4 d-flex">
                                <div className="service-card w-100 d-flex flex-column">
                                    <div className="service-card-num">{offer.num}</div>
                                    <span className="card-title">{offer.title}</span>
                                    <div className="topmate-offer-meta">
                                        <span className="topmate-duration-badge">{offer.duration}</span>
                                        <span
                                            className={
                                                offer.price === "Free"
                                                    ? "topmate-price-badge topmate-price-free"
                                                    : "topmate-price-badge"
                                            }
                                        >
                                            {offer.price}
                                        </span>
                                    </div>
                                    <p className="card-text" style={{ flexGrow: 1 }}>{offer.desc}</p>
                                    <a
                                        href={topmateUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-primary-custom mt-3"
                                        style={{ textAlign: "center" }}
                                    >
                                        Book on Topmate
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Technical Consulting */}
            <div className="light-section" id="consulting">
                <div className="container">
                    <div className="section-title">
                        <h2>Technical Consulting</h2>
                        <p className="section-subtitle">For teams and founders — project scoping, AWS, AI integrations.</p>
                    </div>
                    <div className="row justify-content-center g-4 pb-4">
                        {consultingOffers.map((offer, i) => (
                            <div key={i} className="col-md-7 col-lg-5">
                                <div className="booking-card booking-card-primary h-100 d-flex flex-column">
                                    <div className="booking-card-tag">{offer.tag}</div>
                                    <h3 className="booking-card-title">{offer.title}</h3>
                                    <div className="topmate-offer-meta mb-2">
                                        <span className="topmate-duration-badge">{offer.duration}</span>
                                    </div>
                                    <p className="booking-card-desc">{offer.desc}</p>
                                    <ul className="booking-card-points" style={{ flexGrow: 1 }}>
                                        {offer.points.map((pt, j) => (
                                            <li key={j}>{pt}</li>
                                        ))}
                                    </ul>
                                    <a
                                        href={getUrl(offer.urlKey)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-primary-custom booking-card-btn"
                                    >
                                        {offer.cta}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Social Proof */}
            <div className="dark-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 text-center">
                            <p className="section-subtitle mb-4">What people say</p>
                            <div className="topmate-ratings-row">
                                <div className="topmate-rating-item">
                                    <span className="topmate-rating-score">5.0</span>
                                    <span className="topmate-rating-stars">★★★★★</span>
                                    <span className="topmate-rating-source">Topmate · 4 reviews</span>
                                </div>
                                <div className="topmate-rating-divider" />
                                <div className="topmate-rating-item">
                                    <span className="topmate-rating-score">5.0</span>
                                    <span className="topmate-rating-stars">★★★★★</span>
                                    <span className="topmate-rating-source">Upwork · 5+ reviews</span>
                                </div>
                            </div>
                            <blockquote className="topmate-quote">
                                &ldquo;Explained things clearly without overcomplicating. Got clarity on my career path in one call.&rdquo;
                            </blockquote>
                            <p className="topmate-quote-attr">— Topmate reviewer</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="about-cta">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center">
                            <h2 className="about-cta-heading">Not sure where to start?</h2>
                            <p className="about-cta-sub">
                                The free Quick Chat is zero commitment — 30 minutes to talk through whatever you need.
                            </p>
                            <a
                                href={topmateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary-custom me-3"
                            >
                                Book free session
                            </a>
                            <Link href="/#contact" className="btn-outline-custom">
                                View project services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
