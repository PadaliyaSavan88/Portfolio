import Head from 'next/head';
import Link from 'next/link';
import Headers from '../../components/header';
import Footer from '../../components/footer';
import { getSortedPostsData } from '../../../../components/post';

const TOPICS = ['AI Engineering', 'Web Development', 'Engineering Culture', 'Startups'];

function slugify(topic) {
    return topic.toLowerCase().replace(/\s+/g, '-');
}

function unslugify(slug) {
    return TOPICS.find((t) => slugify(t) === slug);
}

export async function getStaticPaths() {
    return {
        paths: TOPICS.map((t) => ({ params: { topic: slugify(t) } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const topic = unslugify(params.topic);
    const posts = getSortedPostsData()
        .filter((p) => p.topic === topic)
        .map(({ id, title, date, topic, description }) => ({ id, title, date, topic, description: description || '' }));
    return { props: { topic, posts } };
}

export default function BlogCategory({ topic, posts }) {
    return (
        <>
            <Head>
                <title>{topic} Insights | Savan Padaliya</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={`Articles on ${topic}: founder, AI, SaaS, and engineering thinking from Savan Padaliya.`} />
                <link rel="canonical" href={`https://savanpadaliya.com/blogs/category/${slugify(topic)}`} />
                <meta name="robots" content="index, follow" />
            </Head>
            <Headers />
            <div className="blogs-section">
                <div className="container">
                    <nav className="tool-breadcrumb">
                        <Link href="/">Home</Link><span className="tool-breadcrumb-sep">/</span>
                        <Link href="/blogs">Insights</Link><span className="tool-breadcrumb-sep">/</span>
                        <span>{topic}</span>
                    </nav>
                    <div className="section-title" style={{ padding: '1rem 0 2rem' }}>
                        <h1>{topic}</h1>
                    </div>
                    <div className="row g-4 pb-4 justify-content-center">
                        {posts.map((post) => (
                            <div key={post.id} className="col-md-4 d-flex">
                                <Link href={`/blogs/${post.id}`} className="service-card w-100 text-decoration-none d-flex flex-column">
                                    <span className="card-title">{post.title}</span>
                                    <p className="card-text mt-auto">{post.date}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link href="/blogs" className="btn-outline-custom">All Insights</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
