import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    return (
        <section className="newsletter-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <p className="newsletter-label">Newsletter</p>
                        <h2 className="newsletter-title">AI dev tips. What I&apos;m building. No fluff.</h2>
                        <p className="newsletter-desc">
                            Short emails on practical AI development, tools I&apos;m using, and things I&apos;m shipping.
                            One or two a month — never spam.
                        </p>
                        {status === "success" ? (
                            <p className="newsletter-success">You&apos;re in. I&apos;ll be in touch soon.</p>
                        ) : (
                            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
                                <input
                                    type="email"
                                    className="newsletter-input"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-label="Email address"
                                />
                                <button
                                    type="submit"
                                    className="btn-primary-custom newsletter-btn"
                                    disabled={status === "loading"}
                                >
                                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                                </button>
                                {status === "error" && (
                                    <p className="newsletter-error">Something went wrong. Try again.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
