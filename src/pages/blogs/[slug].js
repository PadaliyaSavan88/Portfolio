import { getPostsFiles, getPostData } from '../../../components/post';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import Image from 'next/image';
import Head from 'next/head';
import PostContent from '../../../components/posts/post-content';
import Headers from '../components/header';
import Footer from '../components/footer';

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
    const customRenderers = {
        p(paragraph) {
            const { node } = paragraph;

            if (node.children[0].tagName === 'img') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${props.post.slug}/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },

        code(code) {
            const { className, children } = code;
            const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                >{children}</SyntaxHighlighter>
            );
        },
    };
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

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content={`https://savanpadaliya.com/images/posts/${props.post.imageName}`} />
                <meta property="twitter:title" content={`${props.post.title} | Savan Padaliya`} />
                <meta property="twitter:description" content={props.post.description} />
                <meta property="twitter:image" content={`https://savanpadaliya.com/images/posts/${props.post.imageName}`}></meta>
            </Head>
            <Headers />
            <div className="container" id="conatiner">
                <div className="container w-75 mt-4">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-wrap border-bottom mb-4  me-4" id="blog">
                        <PostContent post={props.post} />
                    </div>
                </ div >
            </div>
            <Footer />
        </div>

    );
}