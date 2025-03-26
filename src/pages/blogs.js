import Link from "next/link";
import { getSortedPostsData } from "../../components/post";
import Footer from "./components/footer";
import Headers from "./components/header";
import Head from "next/head";

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
          Tech Blogs | JavaScript, NodeJS, React, Angular, Blockchain, DevOps
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="title"
          content="Tech Blogs | JavaScript, NodeJS, React, Angular, Blockchain, DevOps"
        />
        <meta
          name="description"
          content="Explore a collection of insightful tech blogs covering JavaScript, NodeJS, React, Angular, Blockchain, DevOps, and more. Stay informed and delve into the latest trends and expertise."
        />
        <meta
          name="keywords"
          content="Tech Blogs, JavaScript, NodeJS, React, Angular, Blockchain, DevOps, Technology Trends, Expertise, Latest Insights."
        />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.savanpadaliya.com/blogs/" />

        <meta
          property="og:title"
          content="Tech Blogs | JavaScript, NodeJS, React, Angular, Blockchain, DevOps"
        />
        <meta
          property="og:site_name"
          content="Savan Padaliya | Full Stack Blockchain developer"
        />
        <meta
          property="og:url"
          content="https://www.savanpadaliya.com/blogs/"
        />
        <meta
          property="og:description"
          content="Explore a collection of insightful tech blogs covering JavaScript, NodeJS, React, Angular, Blockchain, DevOps, and more. Stay informed and delve into the latest trends and expertise."
        />
        <meta property="og:image" content="/graphics/header_logo.png" />
      </Head>
      <Headers />
      <div className="blogs-section">
        <div className="container">
          <div className="section-title">
            <h2>All Blogs</h2>
          </div>
          <div className="container-fluid">
            <div className="row">
              {allPostsData.map(({ id, title, description }) => (
                <div key={id} className="col-md-6 d-flex">
                  <Link
                    href={`/blogs/${id}`}
                    className="text-decoration-none w-100 pb-4"
                  >
                    <div className="basic-blog-card basic-card basic-card-light w-100 h-100 d-flex flex-column">
                      <div className="card-content">
                        <span className="card-title">{title}</span>
                        <p className="card-text">{description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
