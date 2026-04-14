import Image from "next/image";
import AboutUsImage from "../../../public/graphics/about_us.png"

export default function AboutUs() {
    return (
        <div className="light-section" id="about">
            <div className="container">
                <div className="section-title">
                    <h2>About Me</h2>
                </div>
                <div className="row">
                    <div className="col-lg-6 about-image-col p-2">
                        <Image src={AboutUsImage} alt="About Me" height={350} width={350} />
                    </div>
                    <div className="col-lg-6 about-text">
                        <p>
                        As a Full Stack AI Engineer with 4+ years of expertise in JavaScript and Node.js, I build intelligent web applications and AI-powered automation pipelines. I specialize in embedding AI capabilities — via OpenAI, Gemini, and Vertex AI — into production-grade products, from conversational chatbots to SEO automation tools and LLM-driven SaaS platforms.
                        </p>
                        <p>
                        On the frontend, I excel in React, Angular, and Next.js with a strong focus on performance and SEO. My backend work spans robust API design, third-party integrations (Stripe, Google Maps, Twilio, Socket.io), and workflow automation with N8N and LangChain. With solid deployment experience using Docker, Kubernetes, and cloud platforms including AWS, Azure, and Google Cloud, I deliver end-to-end solutions that are scalable, maintainable, and AI-ready.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}