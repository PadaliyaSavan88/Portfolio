import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import PostHeader from './post-header';

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="reading-progress-track" aria-hidden="true">
      <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

function PostImage({ src, alt }) {
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <div>
      <Image
        src={src}
        alt={alt}
        width={950}
        height={600}
        style={{ width: '100%', height: 'auto' }}
        onError={() => setError(true)}
      />
      <br />
    </div>
  );
}

function ShareButtons({ title, slug }) {
  const url = `https://www.savanpadaliya.com/blogs/${slug}/`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=padaliya_savan`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="share-section">
      <p className="share-label">Found this useful? Share it.</p>
      <div className="share-buttons">
        <a href={twitterUrl} target="_blank" rel="noreferrer" className="share-btn share-btn-twitter">
          Share on Twitter
        </a>
        <a href={linkedinUrl} target="_blank" rel="noreferrer" className="share-btn share-btn-linkedin">
          Share on LinkedIn
        </a>
      </div>
    </div>
  );
}

function AuthorCTA() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '#';
  return (
    <div className="author-cta-card">
      <div className="author-cta-avatar">SP</div>
      <div className="author-cta-body">
        <p className="author-cta-name">Savan Padaliya</p>
        <p className="author-cta-bio">
          Senior Full Stack Developer who ships faster with AI.
          Available for freelance, consulting, and project work.
        </p>
        <div className="author-cta-actions">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-custom author-cta-btn"
          >
            Book a Free Call
          </a>
          <Link
            href="/#services"
            className="author-cta-services-link"
          >
            View Services →
          </Link>
        </div>
      </div>
    </div>
  );
}

function PostContent({ post }) {
  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <PostImage
            src={`/images/posts/${image.properties.src}`}
            alt={image.properties.alt || ''}
          />
        );
      }
      return <p>{paragraph.children}</p>;
    },

    table({ children }) {
      return (
        <div className="blog-table-wrapper">
          <table className="blog-table">{children}</table>
        </div>
      );
    },

    code(code) {
      const { className, children } = code;
      if (!className) {
        return <code>{children}</code>;
      }
      const language = className.split('-')[1];
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  const imagePath = `/images/posts/${post.image}`;

  return (
    <>
      <ReadingProgress />
      <article>
        <PostHeader data={post} />
        <div className="blog-content mt-3" id="content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={customRenderers}>
            {post.content}
          </ReactMarkdown>
        </div>
        <ShareButtons title={post.title} slug={post.slug} />
        <AuthorCTA />
      </article>
    </>
  );
}

export default PostContent;
