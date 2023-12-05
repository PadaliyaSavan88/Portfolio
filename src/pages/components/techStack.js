import Image from "next/image";

export default function TechStack() {
    return (
        <div className="tech-section">
            <div className="container">
                <div className="section-title">
                A Palette of Skills!!
                </div>
                <div className="row">
                    <div className="col-md-6 text-center">
                        <div className="sub-section-title">Frameworks & Libraries</div>
                        <Image src='/icons/javascript.svg' className="tech-icon" alt="JavaScript" title="JavaScript" width={80} height={80} />
                        <Image src='/icons/nodejs.svg' className="tech-icon" alt="NodeJS" title="NodeJS" width={80} height={80} />
                        <Image src='/icons/react.svg' className="tech-icon" alt="React" title="React" width={80} height={80} />
                        <Image src='/icons/angularjs.svg' className="tech-icon" alt="Angular" title="Angular" width={80} height={80} />
                        <Image src='/icons/nextjs.svg' className="tech-icon" alt="NextJS" title="NextJS" width={80} height={80} />
                        <Image src='/icons/typescript.svg' className="tech-icon" alt="TypeScript" title="TypeScript" width={80} height={80} />
                        <Image src='/icons/express.svg' className="tech-icon" alt="Express" title="Express" width={80} height={80} />
                        <Image src='/icons/solidity.svg' className="tech-icon" alt="Solidity" title="Solidity" width={80} height={80} />
                    </div>
                    <div className="col-md-6 text-center">
                        <div className="sub-section-title">Database</div>
                        <Image src='/icons/mongodb.svg' className="tech-icon" alt="MongoDB" title="MongoDB" width={80} height={80} />
                        <Image src='/icons/mysql.svg' className="tech-icon" alt="MySQL" title="MySQL" width={80} height={80} />
                        <Image src='/icons/postgresql.svg' className="tech-icon" alt="Postgrsql" title="Postgrsql" width={80} height={80} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6 text-center">
                        <div className="sub-section-title">Cloud</div>
                        <Image src='/icons/Amazonwebservices.svg' className="tech-icon" alt="AWS" title="AWS" width={120} height={120} />
                        <Image src='/icons/azure.svg' className="tech-icon" alt="Azure" title="Azure" width={120} height={120} />
                        <Image src='/icons/googlecloud.svg' className="tech-icon" alt="GoogleCloud" title="Google Cloud" width={120} height={120} />
                        <Image src='/icons/digitalocean.svg' className="tech-icon" alt="DigitalOcean" title="Digital Ocean" width={120} height={120} />
                    </div>
                    <div className="col-md-6 text-center">
                        <div className="sub-section-title">DevOps & Other</div>
                        <Image src='/icons/docker.svg' className="tech-icon" alt="Docker" title="Docker" width={100} height={100} />
                        <Image src='/icons/kubernetes.svg' className="tech-icon" alt="Kubernetes" title="Kubernetes" width={80} height={80} />
                        <Image src='/icons/redis.svg' className="tech-icon" alt="Redis" title="Redis" width={90} height={90} />
                        <Image src='/icons/apachekafka.svg' className="tech-icon" alt="ApacheKafka" title="Apache Kafka" width={120} height={120} />
                        <Image src='/icons/nginx.svg' className="tech-icon" alt="Nginx" title="Nginx" width={120} height={120} />
                    </div>
                </div>
            </div>
        </div>
    )
}