function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getReadingTime(content) {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function PostHeader({ data }) {
  const { title, author, date, content } = data;
  const readingTime = getReadingTime(content);

  return (
    <header className="post-header">
      <h1 className="post-header-title">{title}</h1>
      <div className="post-header-meta">
        <a
          href="https://www.linkedin.com/in/savanpadaliya/"
          target="_blank"
          rel="noreferrer"
          className="post-header-author"
        >
          {author}
        </a>
        <span className="post-meta-dot" aria-hidden="true">·</span>
        <span className="post-header-date">{formatDate(date)}</span>
        <span className="post-meta-dot" aria-hidden="true">·</span>
        <span className="post-header-reading-time">{readingTime} min read</span>
      </div>
    </header>
  );
}

export default PostHeader;
