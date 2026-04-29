export default function Contact() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";
    const topmateUrl = process.env.NEXT_PUBLIC_TOPMATE_URL || "#";

    return (
        <section className="contact-section" id="contact" aria-label="Book a project call with Savan Padaliya">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "@id": "https://savanpadaliya.com/#person",
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
                    <div className="col-lg-7 text-center">
                        <p className="contact-eyebrow">Work with me</p>
                        <h2 className="contact-heading">Let&apos;s build something useful.</h2>
                        <p className="contact-intro">
                            If you need a senior engineer for an MVP, AI integration, automation workflow,
                            or product backlog, start a conversation.
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6">
                        <div className="booking-card booking-card-primary">
                            <div className="booking-card-tag">For professionals &amp; businesses</div>
                            <h3 className="booking-card-title">Book a project call</h3>
                            <p className="booking-card-desc">
                                Got a product to build, a team that needs a senior hand, or an AI integration
                                you want to scope out? Let&apos;s spend 30 minutes on it.
                            </p>
                            <ul className="booking-card-points">
                                <li>Project scoping &amp; estimation</li>
                                <li>Technical architecture review</li>
                                <li>Freelance &amp; consulting engagements</li>
                                <li>NDA available &mdash; your idea stays confidential</li>
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
                </div>

                <div className="text-center mt-4">
                    <p className="contact-note">
                        Need career guidance instead?{" "}
                        <a href={topmateUrl} target="_blank" rel="noreferrer">
                            Book a 1:1 on Topmate
                        </a>
                        {" · "}
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
