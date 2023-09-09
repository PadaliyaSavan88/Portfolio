import StaticHeader from "@/components/staticHeader";
import { getSortedPostsData } from "@/lib/posts";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
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
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="Assests/Css/bootstarp.css" />

                <title>The Blockchain Insider</title>
            </Head>
            <StaticHeader />
            <div className="container-lg container-xxl container-xl container-md container-sm" id="conatiner">
                <div className="container w-75">
                    <div className="row vh-100 align-items-center justify-content-center d-flex">
                        <div>
                            <div className="h1 d-flex align-items-center justify-content-center ">
                                All Blogs
                            </div>
                            <div className="row" >
                                <div className="row  border-bottom" >
                                    <div className="h3 p-3 col-10" >
                                        Title
                                    </div>

                                    <div className=" p-3 col-2" >
                                        <span onClick={() => { toggleMenu() }} >
                                            View All
                                        </span>
                                    </div>

                                </div>

                                <div className="row" >

                                    {allPostsData.map(({ id, date, title }) => (
                                        <Link href={`/blog/${id}`} key={id}>
                                            <div className="card card-hover-2 col-lg-4 ">

                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img" alt="..." width={100} height={220} />


                                                <div className="card-body">
                                                    <h5 className="card-title">{title}</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
                                                </div>
                                            </div></Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}