import Link from "next/link";
import Image from "next/image";

export default function Contact() {
    return (
        <section className="contact-section" id="contact" aria-label="Contact Savan Padaliya">
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
                <div className="section-title">
                    <h2>Let&apos;s Connect</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-7 text-center">
                        <p className="contact-intro">
                            Have a project in mind, want to discuss AI integrations, or just want to say hello?
                            I&apos;m open to freelance work, consulting, and full-time opportunities.
                        </p>
                        <div className="contact-links mt-4">
                            <a
                                href="https://www.linkedin.com/in/savanpadaliya/"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-primary-custom me-3"
                            >
                                Connect on LinkedIn
                            </a>
                            <a
                                href="https://twitter.com/padaliya_savan"
                                target="_blank"
                                rel="noreferrer"
                                className="btn-outline-custom"
                            >
                                Follow on Twitter
                            </a>
                        </div>
                        <p className="contact-note mt-4">
                            Prefer email? Drop a message via{" "}
                            <a
                                href="https://www.linkedin.com/in/savanpadaliya/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn DM
                            </a>{" "}
                            and I&apos;ll get back to you within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
