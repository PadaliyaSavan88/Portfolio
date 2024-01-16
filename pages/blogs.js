import Image from "next/image";
import '../public/Assests/js/main'
// import "../public/Assests/Css/bootstrap.css"
import Head from "next/head";
import StaticHeader from "@/components/staticHeader";
import Footer from "@/components/footer";
import Link from "next/link";

export default function blogs() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Link rel="stylesheet" href="Assests/Css/bootstarp.css" />
                <title>Blogs | The Blockchain Insider</title>

                <meta name="title" content="Blogs | The Blockchain Insider" />
                <meta name="description" content="Explore our innovative blockchain solutions, web and mobile app development, AI/ML, data services, and software development. We're your strategic partners in the digital era." />
                <meta name="keywords" content="blockchain solutions, web development, mobile app development, AI/ML, data services, software development, digital transformation" />
                <meta name="language" content="English" />
                <link rel="canonical" href="https://www.theblockchaininsider.com/allBlogs/" />

                <meta property="og:title" content="Blogs | The Blockchain Insider" />
                <meta property="og:site_name" content="The Blockchain Insider" />
                <meta property="og:url" content="https://www.theblockchaininsider.com/allBlogs/" />
                <meta property="og:description" content="Explore our innovative blockchain solutions, web and mobile app development, AI/ML, data services, and software development. We're your strategic partners in the digital era." />
                <meta property="og:image" content="/images/210 x 210.png" />
            </Head>
            <StaticHeader />
            <div className="container" id="conatiner">
                <div className="container w-75 ">

                    <div className="border-bottom border-3 my-3 align-items-center justify-content-center text-wrap">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Library</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Data</li>
                        </ol>
                    </div>
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-wrap border-bottom mb-4  me-4" id="blog">

                            <div id="blog-header my-2">
                                <div className="h3">
                                    FOOD HACKS WITH FOXY BINGO
                                </div>
                                <div className="fw-light lh-1 fs-6">
                                    <blockquote className="text-muted">
                                        Created By Darshan on 03-03-2012
                                    </blockquote>
                                </div>
                            </div>

                            <div className="blog-content mt-3" id="content">
                                <div className="text pb-4">
                                    After a long blogging hiatus, The Healthy Hangover is back. To celebrate a return to blogging we’ve put together a fun treat for you all with Foxy Bingo. We provided our friends over at Foxy with the food hacks section of their new random life tip generator. Great examples of the food hacks included within the article would be genius uses for grapes, healthy alternatives to ice cream and the lesser known secret technique to find out if your avocado really is ripe (And avoid being thrown out of the supermarket for over-eager avocado fondling)
                                </div>

                                <div className="text pb-4">
                                    After a long blogging hiatus, The Healthy Hangover is back. To celebrate a return to blogging we’ve put together a fun treat for you all with Foxy Bingo. We provided our friends over at Foxy with the food hacks section of their new random life tip generator. Great examples of the food hacks included within the article would be genius uses for grapes, healthy alternatives to ice cream and the lesser known secret technique to find out if your avocado really is ripe (And avoid being thrown out of the supermarket for over-eager avocado fondling)
                                </div>
                                <div className="text pb-4">
                                    After a long blogging hiatus, The Healthy Hangover is back. To celebrate a return to blogging we’ve put together a fun treat for you all with Foxy Bingo. We provided our friends over at Foxy with the food hacks section of their new random life tip generator. Great examples of the food hacks included within the article would be genius uses for grapes, healthy alternatives to ice cream and the lesser known secret technique to find out if your avocado really is ripe (And avoid being thrown out of the supermarket for over-eager avocado fondling)
                                </div>

                            </div>


                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col" id="ads">
                            <div className="row">
                                <div className="d-flex align-items-center justify-content-center text-wrap h4">
                                    Releted Articles
                                </div>
                                <div className="col-lg-3 col-md-4 col-6 mb-4">
                                    <a href="#" className="text-decoration-none">
                                        <div className="align-items-center justify-content-center text-wrap">
                                            <div className="card h-100">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={100} width={100} />
                                                <div className="card-body">
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>

                                <div className="col-lg-3 col-md-4 col-6 mb-4">
                                    <a href="#" className="text-decoration-none">
                                        <div className="align-items-center justify-content-center text-wrap">
                                            <div className="card h-100">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={100} width={100} />
                                                <div className="card-body">
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>


                                <div className="col-lg-3 col-md-4 col-6 mb-4">
                                    <a href="#" className="text-decoration-none">
                                        <div className="align-items-center justify-content-center text-wrap">
                                            <div className="card h-100">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={100} width={100} />
                                                <div className="card-body">
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>

                                <div className="col-lg-3 col-md-4 col-6 mb-4">
                                    <a href="#" className="text-decoration-none">
                                        <div className="align-items-center justify-content-center text-wrap">
                                            <div className="card h-100">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={100} width={100} />
                                                <div className="card-body">
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>

                                <div className="col-lg-3 col-md-4 col-6 mb-4">
                                    <a href="#" className="text-decoration-none">
                                        <div className="align-items-center justify-content-center text-wrap">
                                            <div className="card h-100">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={100} width={100} />
                                                <div className="card-body">
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
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