import Link from "next/link";

export default function InsightsTeaser({ posts = [] }) {
    return (
        <div className="light-section" id="insights">
            <div className="container">
                <div className="section-title">
                    <h2>Insights</h2>
                    <p className="section-subtitle">Founder, AI, SaaS, and engineering thinking.</p>
                </div>
                <div className="row g-4 pb-4 justify-content-center">
                    {posts.map((post) => (
                        <div key={post.id} className="col-md-4 d-flex">
                            <Link href={`/blogs/${post.id}`} className="service-card w-100 text-decoration-none d-flex flex-column">
                                <span className="service-card-for">{post.topic}</span>
                                <span className="card-title">{post.title}</span>
                                <p className="card-text mt-auto">{post.date}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Link href="/blogs" className="btn-outline-custom">View All Insights →</Link>
                </div>
            </div>
        </div>
    );
}
