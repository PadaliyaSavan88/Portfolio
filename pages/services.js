import Footer from "@/components/footer";
import StaticHeader from "@/components/staticHeader";
import Head from "next/head";
import Image from "next/image";


export default function Service() {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="Assests/Css/bootstarp.css" />

                <title>The Blockchain Insider</title>
            </Head>
            <StaticHeader />
            <div className="container-lg container-xxl container-xl container-md container-sm container" id="conatiner">
                <div className="container-fluid">
                    <div className="vh-100 d-flex align-items-center justify-content-center">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <div className="h1 d-flex align-items-center justify-content-center">
                                            What we are Capable Of Doing..
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="row">
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4 d-flex align-items-center justify-content-center py-5">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="img-fluid rounded-start" alt="..." height={250} width={250} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">Full Stack Web Development</h5>
                                                    <p className="card-text">We provide Web development service to provide a solution to your business problem. Boost your revenue bu automating your business with on stop solution.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="card mb-3">
                                        <div className="row flex-row-reverse g-0">
                                            <div className="col-md-4 d-flex align-items-center justify-content-center py-5">
                                                <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="img-fluid rounded-start" alt="..." height={250} width={250} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">Smart Contract Development</h5>
                                                    <p className="card-text">Smart contracts plays a crucial role in developing decentralised applications. We servers services like Smart contract development, testing, audting services related to smart contracts on Ethereum L1 and L2 chains.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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