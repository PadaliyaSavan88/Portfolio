import Head from 'next/head';
import Image from 'next/image'
// import Layout from '../../components/layout';
import { getPostsFiles, getPostData } from '../../lib/posts';
import StaticHeader from '@/components/staticHeader';
import Footer from '@/components/footer';
import PostContent from '@/components/posts/post-content';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'; 

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
          <link rel="stylesheet" href="../Assests/Css/bootstarp.css" />
          <title>{props.post.title} | The Blockchain Insider</title>
          <meta name="description" content={props.post.description}></meta>
        </Head>
        <StaticHeader />
        <div className="container" id="conatiner">
          <div className="container w-75 ">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-wrap border-bottom mb-4  me-4" id="blog">
              <PostContent post={props.post}/>
            </div>
          </ div >
        </div>
        <Footer />
      </div>

    );
}