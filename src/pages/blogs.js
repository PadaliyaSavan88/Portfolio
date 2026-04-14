import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSortedPostsData } from "../../components/post";
import Footer from "./components/footer";
import Headers from "./components/header";
import Head from "next/head";

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
  // const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function AllBlogs({ allPostsData }) {
  return (
    <>
      <Head>
        <title>
          Tech Blogs | JavaScript, NodeJS, AI, LLMs, RAG, Vertex AI, DevOps
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="title"
          content="Tech Blogs | JavaScript, NodeJS, AI, LLMs, RAG, Vertex AI, DevOps"
        />
        <meta
          name="description"
          content="Explore insightful tech blogs covering JavaScript, NodeJS, AI integrations, LLMs, RAG architecture, Vertex AI, and production engineering. Stay informed on the latest in AI-powered development."
        />
        <meta
          name="keywords"
          content="Tech Blogs, JavaScript, NodeJS, AI, LLMs, RAG, OpenAI, Vertex AI, LangChain, DevOps, Production Engineering"
        />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.savanpadaliya.com/blogs/" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Savan Padaliya" />

        <meta
          property="og:title"
          content="Tech Blogs | JavaScript, NodeJS, AI, LLMs, RAG, Vertex AI, DevOps"
        />
        <meta
          property="og:site_name"
          content="Savan Padaliya | Full Stack AI Engineer"
        />
        <meta
          property="og:url"
          content="https://www.savanpadaliya.com/blogs/"
        />
        <meta
          property="og:description"
          content="Explore a collection of insightful tech blogs covering JavaScript, NodeJS, React, Angular, Blockchain, DevOps, and more. Stay informed and delve into the latest trends and expertise."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@padaliya_savan" />
        <meta name="twitter:title" content="Tech Blogs | JavaScript, NodeJS, AI, LLMs, RAG, Vertex AI, DevOps" />
        <meta name="twitter:description" content="Explore insightful tech blogs covering JavaScript, NodeJS, AI integrations, LLMs, RAG architecture, Vertex AI, and production engineering." />
        <meta name="twitter:image" content="https://www.savanpadaliya.com/graphics/header_logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Tech Blogs by Savan Padaliya",
              "description": "Articles on JavaScript, Node.js, AI integrations, LLMs, RAG architecture, and production engineering.",
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
      <div className="blogs-section">
        <div className="container">
          <div className="section-title">
            <h2>All Blogs</h2>
          </div>
          <div className="row g-4 pb-5">
            {allPostsData.map(({ id, title, description, image, imageName, date, author }) => {
              // image field stores paths like "images/ddeffi.jpg"; actual files live at /images/posts/
              const filename = imageName || (image && image.split('/').pop());
              const hasImage = filename && /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
              return (
                <div key={id} className="col-md-6 d-flex">
                  <Link href={`/blogs/${id}`} className="text-decoration-none w-100">
                    <div className="blog-card h-100">
                      {hasImage ? (
                        <BlogCardImage src={`/images/posts/${filename}`} alt={title} />
                      ) : (
                        <div className="blog-card-image blog-card-image-placeholder" />
                      )}
                      <div className="blog-card-body">
                        <h3 className="blog-card-title">{title}</h3>
                        <p className="blog-card-desc">{description}</p>
                      </div>
                      <div className="blog-card-footer">
                        <span className="blog-card-author">{author}</span>
                        <span className="blog-card-date">{date}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
