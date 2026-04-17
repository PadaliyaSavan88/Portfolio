import { getPostsFiles, getPostData, getSortedPostsData } from '../../../components/post';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import Image from 'next/image';
import Head from 'next/head';
import PostContent from '../../../components/posts/post-content';
import Headers from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

export function getStaticProps(context) {
    const { params } = context;
    const { slug } = params;
    const postData = getPostData(slug);
    const allPosts = getSortedPostsData();
    const relatedPosts = allPosts.filter((p) => p.id !== slug).slice(0, 3);
    return {
        props: {
            post: postData,
            relatedPosts,
        },
        revalidate: 600,
    };
}

export function getStaticPaths() {
    const postFilenames = getPostsFiles();
    const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));
    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
}

export default function Post({ post, relatedPosts = [] }) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`${post.title} | Savan Padaliya`}</title>
                <meta name="description" content={post.description}></meta>
                <meta name="keywords" content={post.keyword} />
                <meta name="author" content={post.author} />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${post.title} | Savan Padaliya`} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={`https://savanpadaliya.com/images/posts/${post.imageName}`} />
                <meta property="og:url" content={`https://www.savanpadaliya.com/blogs/${post.slug}/`} />
                <link rel="canonical" href={`https://www.savanpadaliya.com/blogs/${post.slug}/`} />
                <meta name="robots" content="index, follow" />

                {/* <!-- Twitter --> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@padaliya_savan" />
                <meta name="twitter:creator" content="@padaliya_savan" />
                <meta property="twitter:title" content={`${post.title} | Savan Padaliya`} />
                <meta property="twitter:description" content={post.description} />
                <meta property="twitter:image" content={`https://savanpadaliya.com/images/posts/${post.imageName}`}></meta>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@graph": [
                        {
                          "@type": "Article",
                          "@id": `https://www.savanpadaliya.com/blogs/${post.slug}/#article`,
                          "headline": post.title,
                          "description": post.description,
                          "author": {
                            "@type": "Person",
                            "name": "Savan Padaliya",
                            "@id": "https://www.savanpadaliya.com/#person",
                            "url": "https://www.savanpadaliya.com"
                          },
                          "publisher": {
                            "@type": "Person",
                            "name": "Savan Padaliya",
                            "url": "https://www.savanpadaliya.com",
                            "image": "https://www.savanpadaliya.com/graphics/header_logo.png"
                          },
                          "datePublished": post.date,
                          "url": `https://www.savanpadaliya.com/blogs/${post.slug}/`,
                          "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://www.savanpadaliya.com/blogs/${post.slug}/`
                          },
                          "keywords": post.keyword || post.description
                        },
                        {
                          "@type": "BreadcrumbList",
                          "itemListElement": [
                            {
                              "@type": "ListItem",
                              "position": 1,
                              "name": "Home",
                              "item": "https://www.savanpadaliya.com/"
                            },
                            {
                              "@type": "ListItem",
                              "position": 2,
                              "name": "Blog",
                              "item": "https://www.savanpadaliya.com/blogs/"
                            },
                            {
                              "@type": "ListItem",
                              "position": 3,
                              "name": post.title,
                              "item": `https://www.savanpadaliya.com/blogs/${post.slug}/`
                            }
                          ]
                        }
                      ]
                    })
                  }}
                />
            </Head>
            <Headers />
            <div className="blog-post-container">
                <div className="container">
                    <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                        <ol className="breadcrumb-list">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-sep" aria-hidden="true">/</li>
                            <li className="breadcrumb-item"><Link href="/blogs">Blog</Link></li>
                            <li className="breadcrumb-sep" aria-hidden="true">/</li>
                            <li className="breadcrumb-item breadcrumb-current" aria-current="page">{post.title}</li>
                        </ol>
                    </nav>
                    <div className="blog-post-content">
                        <PostContent post={post} />
                    </div>
                    {relatedPosts.length > 0 && (
                        <div className="related-posts">
                            <h2 className="related-posts-title">More posts</h2>
                            <div className="row g-4">
                                {relatedPosts.map((p) => (
                                    <div key={p.id} className="col-md-4">
                                        <Link href={`/blogs/${p.id}`} className="related-post-card text-decoration-none">
                                            <h3 className="related-post-card-title">{p.title}</h3>
                                            <p className="related-post-card-desc">{p.description}</p>
                                            <span className="related-post-card-link">Read more →</span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}