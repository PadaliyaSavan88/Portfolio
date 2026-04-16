export default function Contact() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";
    const topmateUrl = process.env.NEXT_PUBLIC_TOPMATE_URL || "#";

    return (
        <section className="contact-section" id="contact" aria-label="Book a call with Savan Padaliya">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "@id": "https://www.savanpadaliya.com/#person",
                        "name": "Savan Padaliya",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "professional inquiries",
                            "url": "https://www.linkedin.com/in/savanpadaliya/",
                            "sameAs": "https://www.linkedin.com/in/savanpadaliya/"
                        }
                    })
                }}
            />
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-6 text-center">
                        <p className="contact-eyebrow">Work with me</p>
                        <h2 className="contact-heading">Let&apos;s talk.</h2>
                        <p className="contact-intro">
                            Whether you&apos;re hiring, building something, or just starting out —
                            pick the session that fits where you are.
                        </p>
                    </div>
                </div>

                <div className="row g-4 justify-content-center">
                    {/* Calendly — for professionals */}
                    <div className="col-md-5">
                        <div className="booking-card booking-card-primary">
                            <div className="booking-card-tag">For professionals & businesses</div>
                            <h3 className="booking-card-title">Hire me / Project call</h3>
                            <p className="booking-card-desc">
                                Got a product to build, a team that needs a senior hand, or an AI integration
                                you want to scope out? Let&apos;s spend 30 minutes on it.
                            </p>
                            <ul className="booking-card-points">
                                <li>Project scoping & estimation</li>
                                <li>Technical architecture review</li>
                                <li>Freelance & consulting engagements</li>
                            </ul>
                            <a
                                href={calendlyUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary-custom booking-card-btn"
                            >
                                Book on Calendly
                            </a>
                        </div>
                    </div>

                    {/* Topmate — for students / early-stage */}
                    <div className="col-md-5">
                        <div className="booking-card booking-card-secondary">
                            <div className="booking-card-tag booking-card-tag-green">For students & early-stage devs</div>
                            <h3 className="booking-card-title">Guidance & career help</h3>
                            <p className="booking-card-desc">
                                Figuring out your career path, stuck on a technical decision, or want honest
                                feedback on your portfolio or resume? I&apos;m happy to help.
                            </p>
                            <ul className="booking-card-points">
                                <li>Career guidance & roadmap</li>
                                <li>Resume & portfolio review</li>
                                <li>Tech stack & learning advice</li>
                            </ul>
                            <a
                                href={topmateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-outline-custom booking-card-btn"
                            >
                                Book on Topmate
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="contact-note">
                        Prefer to message first?{" "}
                        <a href="https://www.linkedin.com/in/savanpadaliya/" target="_blank" rel="noreferrer">
                            Send a LinkedIn DM
                        </a>{" "}
                        — I reply within 24 hours.
                    </p>
                </div>
            </div>
        </section>
    );
}
