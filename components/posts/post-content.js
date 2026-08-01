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
        unoptimized
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

const TOPIC_SERVICE_MAP = {
  'Startups': { href: '/how-i-help/build-your-product', label: 'Build Your Product →' },
  'AI Engineering': { href: '/how-i-help/ai-for-your-product', label: 'Explore AI for Your Product →' },
  'Engineering Culture': { href: '/how-i-help/fractional-cto', label: 'Explore Fractional CTO →' },
  'Web Development': { href: '/how-i-help/scale-your-saas', label: 'Scale Your SaaS →' },
};

function AuthorCTA({ topic }) {
  const service = TOPIC_SERVICE_MAP[topic] || { href: '/#how-i-help', label: 'See How I Can Help →' };
  return (
    <div className="author-cta-card">
      <div className="author-cta-avatar">SP</div>
      <div className="author-cta-body">
        <p className="author-cta-name">Savan Padaliya</p>
        <p className="author-cta-bio">
          Technical Partner for Startup Founders. Helps founders build MVPs, scale SaaS products,
          add AI where it creates leverage, and provides fractional CTO-level leadership.
        </p>
        <div className="author-cta-actions">
          <Link
            href="/contact"
            className="btn-primary-custom author-cta-btn"
          >
            Talk About Your Product
          </Link>
          <Link
            href={service.href}
            className="author-cta-services-link"
          >
            {service.label}
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
        <AuthorCTA topic={post.topic} />
      </article>
    </>
  );
}

export default PostContent;
