const services = [
    {
        num: "01",
        title: "Web & Backend Development",
        text: "Crafting high-performance web applications and scalable backend systems in Node.js — robust APIs, microservices, and third-party integrations built for production."
    },
    {
        num: "02",
        title: "AI Integrations",
        text: "Embedding AI capabilities into your products using OpenAI, Gemini, and LangChain — from intelligent chatbots to automated content pipelines and smart decision systems."
    },
    {
        num: "03",
        title: "SaaS Development",
        text: "Revolutionize your workflow with scalable Software as a Service applications, tailored to enhance efficiency, productivity, and business operations."
    },
    {
        num: "04",
        title: "Technical Consulting",
        text: "Adapting to your unique needs, I offer expert technical guidance ensuring each solution aligns perfectly with your vision, goals, and business requirements."
    }
];

export default function Services() {
    return (
        <div className="dark-section">
            <div className="container">
                <div className="section-title">
                    <h2>What I Do</h2>
                </div>
                <div className="row g-4 pb-4">
                    {services.map((s) => (
                        <div key={s.num} className="col-md-6 col-lg-3 d-flex">
                            <div className="service-card w-100">
                                <div className="service-card-num">{s.num}</div>
                                <span className="card-title">{s.title}</span>
                                <p className="card-text">{s.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
