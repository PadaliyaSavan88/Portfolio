import { getPostsFiles, getPostData } from '../../../components/post';
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
    return {
        props: {
            post: postData,
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

export default function Post(props) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`${props.post.title} | Savan Padaliya`}</title>
                <meta name="description" content={props.post.description}></meta>
                <meta name="keywords" content={props.post.keyword} />
                <meta name="author" content={props.post.author} />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${props.post.title} | Savan Padaliya`} />
                <meta property="og:description" content={props.post.description} />
                <meta property="og:image" content={`https://savanpadaliya.com/images/posts/${props.post.imageName}`} />
                <meta property="og:url" content={`https://www.savanpadaliya.com/blogs/${props.post.slug}/`} />
                <link rel="canonical" href={`https://www.savanpadaliya.com/blogs/${props.post.slug}/`} />
                <meta name="robots" content="index, follow" />

                {/* <!-- Twitter --> */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@padaliya_savan" />
                <meta name="twitter:creator" content="@padaliya_savan" />
                <meta property="twitter:title" content={`${props.post.title} | Savan Padaliya`} />
                <meta property="twitter:description" content={props.post.description} />
                <meta property="twitter:image" content={`https://savanpadaliya.com/images/posts/${props.post.imageName}`}></meta>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@graph": [
                        {
                          "@type": "Article",
                          "@id": `https://www.savanpadaliya.com/blogs/${props.post.slug}/#article`,
                          "headline": props.post.title,
                          "description": props.post.description,
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
                          "datePublished": props.post.date,
                          "url": `https://www.savanpadaliya.com/blogs/${props.post.slug}/`,
                          "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://www.savanpadaliya.com/blogs/${props.post.slug}/`
                          },
                          "keywords": props.post.keyword || props.post.description
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
                              "name": "Blogs",
                              "item": "https://www.savanpadaliya.com/blogs/"
                            },
                            {
                              "@type": "ListItem",
                              "position": 3,
                              "name": props.post.title,
                              "item": `https://www.savanpadaliya.com/blogs/${props.post.slug}/`
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
                    <div className="blog-post-back">
                        <Link href="/blogs" className="back-link" aria-label="Back to all blogs">← Back to Blogs</Link>
                    </div>
                    <div className="blog-post-content">
                        <PostContent post={props.post} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}