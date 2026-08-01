import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
    const topmateUrl = process.env.NEXT_PUBLIC_TOPMATE_URL || "#";

    return (
        <section className="contact-section" id="contact" aria-label="Talk about your product with Savan Padaliya">
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
                        <h2 className="contact-heading">Let&apos;s talk about your product.</h2>
                        <p className="contact-intro">
                            Whether you have an idea, a growing product, or a technical challenge you&apos;re
                            trying to solve — tell me where you are and where you want to go.
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6">
                        <div className="booking-card booking-card-primary">
                            <div className="booking-card-tag">For startup founders &amp; product teams</div>
                            <h3 className="booking-card-title">Talk About Your Product</h3>
                            <p className="booking-card-desc">
                                Have an idea to build, a product that&apos;s growing, or a technical decision
                                you want a second opinion on? Tell me about it and I&apos;ll get back to you.
                            </p>
                            <ul className="booking-card-points">
                                <li>Product &amp; MVP scoping</li>
                                <li>Architecture &amp; scaling review</li>
                                <li>Fractional CTO &amp; technical leadership</li>
                                <li>NDA available &mdash; your idea stays confidential</li>
                            </ul>
                            <Link
                                href="/contact"
                                onClick={() => trackEvent('cta_talk_product')}
                                className="btn-primary-custom booking-card-btn"
                            >
                                Talk About Your Product
                            </Link>
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
