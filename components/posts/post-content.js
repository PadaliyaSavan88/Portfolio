import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import PostHeader from './post-header';

function PostContent(props) {
    const {post} = props;
    // console.log(props)
  
    const imagePath = `/images/posts/${post.image}`;
  
    const customRenderers = {
      // img(image) {
      //   return (
      //     <Image
      //       src={`/images/posts/${post.slug}/${image.src}`}
      //       alt={image.alt}
      //       width={600}
      //       height={300}
      //     />
      //   );
      // },
      p(paragraph) {
        const { node } = paragraph;
        
        if (node.children[0].tagName === 'img') {
          const image = node.children[0];
  
          return (
            <div>
              <Image
                src={`/images/posts/${image.properties.src}`}
                alt={image.alt}
                width={950}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
              <br />
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
        <article>
            <PostHeader data={post} image={imagePath} />
            <div className="blog-content mt-3" id="content">
                <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
  }
  
  export default PostContent;