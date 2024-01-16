import Footer from "@/components/footer";
import StaticHeader from "@/components/staticHeader";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";



export default function Service() {

    const allPostsData = [
        {
            id: 1,
            title: 'Full Stack Web Development',
            data: 'We provide Web development service to provide a solution to your business problem. Boost your revenue by automating your business with one stop solution.'
        },
        {
            id: 2,
            title: 'Blockchain Application Development',
            data: 'Blockchain application enables true decentralization. We serve services like Smart contract development, testing, and auditing services related to smart contracts on Ethereum L1 and L2 chains.'

        },
        {
            id: 3,
            title: 'Software Development',
            data: 'With software development, unlock your business potential by automating your processes using tech. Give an innovative shift to your business with tailored softwares.'

        },
        {
            id: 4,
            title: 'Mobile Application Development',
            data: 'Mobile applications can add more value to your business. Making your business available at customers\' fingertips can make it easily accessible and user-friendly.'

        },
        {
            id: 5,
            title: 'AI/ML Development',
            data: 'Using AI/ML for your business can unlock new growth opportunities. Tech innovation and leveraging automation with AI/ML can elevate your business and make customer deliveries unbeatable.'

        },
        {
            id: 6,
            title: 'Data Engineering',
            data: 'Leveraging data, analytics, and statistics to enhance your business. Deliver data-driven experiences and insights across platforms with data engineering.'

        }
    ]

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="stylesheet" href="Assests/Css/bootstarp.css" /> */}
                <title>Our Services - Blockchain Solutions, Web Development, and More</title>
                <meta name="description" content="Explore our comprehensive range of services, including blockchain solutions, web development, mobile app development, AI/ML, data services, and software development"></meta>
                <meta name="keywords" content="blockchain services, web development, mobile app development, AI/ML solutions, data services, software development"></meta>
                <meta name="language" content="English" />
                <link rel="canonical" href="https://www.theblockchaininsider.com/services/" />

                <meta property="og:title" content="Our Services - Blockchain Solutions, Web Development, and More" />
                <meta property="og:site_name" content="The Blockchain Insider" />
                <meta property="og:url" content="https://www.theblockchaininsider.com/services/" />
                <meta property="og:description" content="Explore our comprehensive range of services, including blockchain solutions, web development, mobile app development, AI/ML, data services, and software development" />
                <meta property="og:image" content="/images/210 x 210.png" />
            </Head>
            <StaticHeader />
            <div className="container-lg container-xxl container-xl container-md container-sm container" id="conatiner">
                <div className="container-fluid ">
                    <div className="min-vh-100 d-flex align-items-center justify-content-center">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <div className="h1 mt-4 d-flex align-items-center justify-content-center">
                                            What we are Capable Of Doing..
                                        </div>
                                    </div>
                                </div>



                                <div className="row ">

                                    {/* <div className="col-6" >
                                    <div className="card  m-3 ps-0">
                                        <div className="row g-0">
                                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="img-fluid rounded-start" alt="..." height={500} width={500} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">Full Stack Web Development</h5>
                                                    <p className="card-text text-truncate">We provide Web development service to provide a solution to your business problem. Boost your revenue bu automating your business with on stop solution.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    </div>

                                    <div className="col-6" >
                                    <div className="card m-3 pe-0">
                                        <div className="row g-0">
                                            <div className="col-md-4 ms-auto d-flex align-items-center justify-content-center ">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="img-fluid rounded-end d-flex float-end" alt="..." height={250} width={250} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">Smart Contract Development</h5>
                                                    <p className="card-text text-truncate">Smart contracts plays a crucial role in developing decentralised applications. We servers services like Smart contract development, testing, audting services related to smart contracts on Ethereum L1 and L2 chains.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div> */}

                                    <div className="card-group mb-5  " >

                                        {allPostsData.map(({ id, title, data }) => (
                                            <div key={id} className=" col-lg-4 col-md-6 card card-service-hover col-sm-12 p-2 mt-5 mx-auto" >
                                                {/* <Link href={`/blog/${id}`} key={id} className="decoration-none " > */}
                                                <div className="  ">
                                                    {/* <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img" alt="..." width={100} height={220} /> */}
                                                    <div className="card-body">
                                                        <h5 className="card-title text-dark ">{title}</h5>
                                                        <hr />
                                                        <p className="card-text px-2 text-muted text-justify text-truncate-all-blog-page">{data}</p>
                                                    </div>

                                                </div>
                                                {/* </Link> */}
                                            </div>
                                        ))}
                                    </div>


                                </div>

                                <div className="row">

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