import Image from "next/image";

const aiTools = ['OpenAI API', 'Gemini API', 'Vertex AI', 'LangChain', 'N8N', 'Google ADK', 'MCP'];
const categories = ['AI', 'SaaS', 'Cloud', 'Distributed Systems'];

export default function TechStack() {
    return (
        <div className="light-section" id="skills">
            <div className="container">
                <div className="section-title">
                    <h2>The technology behind the work</h2>
                    <p className="section-subtitle">
                        I work across modern web, cloud, and AI infrastructure. The stack depends on the product, not the other way around.
                    </p>
                </div>

                <div className="row justify-content-center pb-3">
                    <div className="col-lg-8 text-center">
                        <div className="stack-category-pills">
                            {categories.map((c) => (
                                <span key={c} className="stack-category-pill">{c}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <details className="stack-details">
                            <summary className="stack-details-summary">Show full stack</summary>
                            <div className="row g-4 pb-4 pt-4">
                                {/* Frontend */}
                                <div className="col-md-6">
                                    <div className="stack-group">
                                        <div className="stack-group-label">Frontend</div>
                                        <p className="stack-group-desc">Interfaces that load fast and scale.</p>
                                        <div className="stack-icons">
                                            <Image src='/icons/react.svg' className="tech-icon" alt="React" title="React" width={60} height={60} />
                                            <Image src='/icons/nextjs.svg' className="tech-icon" alt="Next.js" title="Next.js" width={60} height={60} />
                                            <Image src='/icons/javascript.svg' className="tech-icon" alt="JavaScript" title="JavaScript" width={60} height={60} />
                                            <Image src='/icons/typescript.svg' className="tech-icon" alt="TypeScript" title="TypeScript" width={60} height={60} />
                                            <Image src='/icons/angularjs.svg' className="tech-icon" alt="Angular" title="Angular" width={60} height={60} />
                                        </div>
                                    </div>
                                </div>

                                {/* Backend */}
                                <div className="col-md-6">
                                    <div className="stack-group">
                                        <div className="stack-group-label">Backend</div>
                                        <p className="stack-group-desc">APIs, auth, integrations, and server logic.</p>
                                        <div className="stack-icons">
                                            <Image src='/icons/nodejs.svg' className="tech-icon" alt="Node.js" title="Node.js" width={60} height={60} />
                                            <Image src='/icons/express.svg' className="tech-icon" alt="Express" title="Express" width={60} height={60} />
                                            <Image src='/icons/docker.svg' className="tech-icon" alt="Docker" title="Docker" width={60} height={60} />
                                            <Image src='/icons/kubernetes.svg' className="tech-icon" alt="Kubernetes" title="Kubernetes" width={60} height={60} />
                                            <Image src='/icons/nginx.svg' className="tech-icon" alt="Nginx" title="Nginx" width={60} height={60} />
                                        </div>
                                    </div>
                                </div>

                                {/* Data & Infrastructure */}
                                <div className="col-md-6">
                                    <div className="stack-group">
                                        <div className="stack-group-label">Data &amp; Infrastructure</div>
                                        <p className="stack-group-desc">Storage, caching, streaming, and cloud deployment.</p>
                                        <div className="stack-icons">
                                            <Image src='/icons/mongodb.svg' className="tech-icon" alt="MongoDB" title="MongoDB" width={60} height={60} />
                                            <Image src='/icons/postgresql.svg' className="tech-icon" alt="PostgreSQL" title="PostgreSQL" width={60} height={60} />
                                            <Image src='/icons/mysql.svg' className="tech-icon" alt="MySQL" title="MySQL" width={60} height={60} />
                                            <Image src='/icons/redis.svg' className="tech-icon" alt="Redis" title="Redis" width={60} height={60} />
                                            <Image src='/icons/apachekafka.svg' className="tech-icon" alt="Kafka" title="Apache Kafka" width={60} height={60} />
                                            <Image src='/icons/amazonwebservices.svg' className="tech-icon" alt="AWS" title="AWS" width={60} height={60} />
                                            <Image src='/icons/googlecloud.svg' className="tech-icon" alt="Google Cloud" title="Google Cloud" width={60} height={60} />
                                            <Image src='/icons/azure.svg' className="tech-icon" alt="Azure" title="Azure" width={60} height={60} />
                                            <Image src='/icons/digitalocean.svg' className="tech-icon" alt="DigitalOcean" title="DigitalOcean" width={60} height={60} />
                                        </div>
                                    </div>
                                </div>

                                {/* AI & Automation */}
                                <div className="col-md-6">
                                    <div className="stack-group">
                                        <div className="stack-group-label">AI &amp; Automation</div>
                                        <p className="stack-group-desc">LLMs, agents, and workflow automation.</p>
                                        <div className="stack-icons ai-pills-wrap">
                                            {aiTools.map((tool) => (
                                                <span key={tool} className="ai-tool-pill">{tool}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
