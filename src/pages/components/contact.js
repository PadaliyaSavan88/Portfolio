export default function Contact() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

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
                <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                        <p className="contact-eyebrow">Ready to work together?</p>
                        <h2 className="contact-heading">Let&apos;s talk about your project.</h2>
                        <p className="contact-intro">
                            Book a free 30-minute call. We&apos;ll talk through what you&apos;re building,
                            whether I&apos;m the right fit, and what a first week together could look like.
                        </p>
                        <a
                            href={calendlyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary-custom contact-cta-btn"
                        >
                            Book a Free Call
                        </a>
                        <p className="contact-note mt-4">
                            Prefer to message first?{" "}
                            <a
                                href="https://www.linkedin.com/in/savanpadaliya/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Send a LinkedIn DM
                            </a>{" "}
                            — I reply within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
