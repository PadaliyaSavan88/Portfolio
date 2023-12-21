import Footer from "@/components/footer";
import StaticHeader from "@/components/staticHeader";
// import "/Assests/Css/bootstarp"
import { getSortedPostsData } from "@/lib/posts";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    const [is_all_visible, setis_all_visible] = useState(false);
    const toggleMenu = () => setis_all_visible(!is_all_visible);
    // let is_all_visible = false;
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="Assests/Css/bootstarp.css" />
                <title>TheBlockchainInsider Blog - Stay Informed with Our Insights</title>
                <meta name="description" content="Read our latest blogs on blockchain, technology, and digital transformation. Stay updated with expert insights from our diverse team."></meta>
                <meta name="keywords" content="blockchain insights, technology blogs, digital transformation, expert opinions"></meta>
            </Head>
            <StaticHeader />
            <div className="container-lg container-xxl container-xl container-md container-sm" id="conatiner">
                <div className="container w-75">
                    <div className="row min-vh-100 mt-2  d-flex">
                        <div>
                            <div className="h1 d-flex align-items-center justify-content-center ">
                                All Blogs
                            </div>
                            <div className="row" >
                                <div className="row  border-bottom" >
                                    <div className="h3 p-3 col-10" >
                                        Title
                                    </div>

                                    <div className=" p-3 col-2 " >
                                        <span className="cursor-pointer" onClick={() => { toggleMenu() }} >
                                            View All
                                        </span>
                                    </div>

                                </div>

                                <div className="card-group" >

                                    {allPostsData.map(({ id, title , data }) => (

                                        
                                        <div key={id} className=" col-lg-3 col-md-4 mt-5  card mx-4" >
                                            <Link href={`/blog/${id}`} className="decoration-none " >
                                                {/* <a> */}
                                                    <div className=" card-hover-3 ">
                                                        <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img" alt="..." width={100} height={220} />
                                                        <div className="card-body">
                                                            <h5 className="card-title text-dark ">{title}</h5>
                                                            <p className="card-text text-dark text-truncate-all-blog-page">{data}</p>
                                                        </div>

                                                    </div>
                                                {/* </a> */}
                                            </Link>
                                        </div>
                                        
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}