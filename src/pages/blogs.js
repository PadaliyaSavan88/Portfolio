import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSortedPostsData } from "../../components/post";
import Footer from "./components/footer";
import Headers from "./components/header";
import Head from "next/head";

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function FeaturedCardImage({ src, alt }) {
  const [error, setError] = useState(false);
  if (error) return <div className="featured-card-gradient" />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "cover" }}
      onError={() => setError(true)}
    />
  );
}

function BlogCardImage({ src, alt }) {
  const [error, setError] = useState(false);
  if (error) return <div className="blog-card-image blog-card-image-placeholder" />;
  return (
    <div className="blog-card-image">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        onError={() => setError(true)}
      />
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
}

export default function AllBlogs({ allPostsData }) {
  const [featured, ...rest] = allPostsData;
  const featuredFilename = featured?.imageName || (featured?.image && featured.image.split('/').pop());
  const featuredHasImage = featuredFilename && /\.(jpg|jpeg|png|gif|webp)$/i.test(featuredFilename);

  return (
    <>
      <Head>
        <title>Blog | AI, Full Stack Development & Building in Public — Savan Padaliya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="title" content="Blog | AI, Full Stack Development & Building in Public — Savan Padaliya" />
        <meta name="description" content="Practical writing on AI development, Node.js, React, system design, and shipping software faster. By Savan Padaliya — Senior Full Stack Developer." />
        <meta name="keywords" content="Tech Blogs, JavaScript, NodeJS, AI, LLMs, RAG, OpenAI, Vertex AI, LangChain, DevOps, Production Engineering" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.savanpadaliya.com/blogs/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Savan Padaliya" />

        <meta property="og:title" content="Blog | AI, Full Stack Development & Building in Public — Savan Padaliya" />
        <meta property="og:site_name" content="Savan Padaliya" />
        <meta property="og:url" content="https://www.savanpadaliya.com/blogs/" />
        <meta property="og:description" content="Practical writing on AI development, Node.js, React, system design, and shipping software faster." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:title" content="Blog — Savan Padaliya" />
        <meta name="twitter:description" content="Practical writing on AI development, Node.js, and shipping software faster." />
        <meta name="twitter:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Blog by Savan Padaliya",
              "description": "Articles on AI development, Node.js, React, and shipping software faster.",
              "url": "https://www.savanpadaliya.com/blogs/",
              "itemListElement": allPostsData.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://www.savanpadaliya.com/blogs/${post.id}/`,
                "name": post.title
              }))
            })
          }}
        />
      </Head>
      <Headers />

      <div className="blog-list-page">
        <div className="container">

          {/* Page header */}
          <div className="blog-list-header">
            <h1 className="blog-list-title">Writing</h1>
            <p className="blog-list-subtitle">
              Practical posts on AI, full stack development, and building things that actually ship.
            </p>
          </div>

          {/* Featured post */}
          {featured && (
            <Link href={`/blogs/${featured.id}`} className="text-decoration-none">
              <div className="featured-card">
                <div className="featured-card-image-wrap">
                  {featuredHasImage
                    ? <FeaturedCardImage src={`/images/posts/${featuredFilename}`} alt={featured.title} />
                    : <div className="featured-card-gradient" />
                  }
                </div>
                <div className="featured-card-body">
                  <span className="featured-card-badge">Latest</span>
                  <h2 className="featured-card-title">{featured.title}</h2>
                  <p className="featured-card-desc">{featured.description}</p>
                  <div className="featured-card-meta">
                    <span>{formatDate(featured.date)}</span>
                    <span className="meta-dot">·</span>
                    <span>{featured.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="row g-4 pb-5 mt-2">
              {rest.map(({ id, title, description, image, imageName, date, readingTime }) => {
                const filename = imageName || (image && image.split('/').pop());
                const hasImage = filename && /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
                return (
                  <div key={id} className="col-md-6 d-flex">
                    <Link href={`/blogs/${id}`} className="text-decoration-none w-100">
                      <div className="blog-card h-100">
                        {hasImage
                          ? <BlogCardImage src={`/images/posts/${filename}`} alt={title} />
                          : <div className="blog-card-image blog-card-image-placeholder" />
                        }
                        <div className="blog-card-body">
                          <h3 className="blog-card-title">{title}</h3>
                          <p className="blog-card-desc">{description}</p>
                        </div>
                        <div className="blog-card-footer">
                          <span className="blog-card-date">{formatDate(date)}</span>
                          <span className="blog-card-reading-time">{readingTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
