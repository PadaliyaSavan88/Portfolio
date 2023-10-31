import Image from "next/image";
import '../public/Assests/js/main'
import Head from "next/head";
import StaticHeader from "@/components/staticHeader";
import Footer from "@/components/footer";

export default function aboutUs() {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="Assests/Css/bootstarp.css" />

                <title>Blogs | The Blockchain Insider</title>
            </Head>
            <StaticHeader />
            <div className="h-auto height-our  d-flex align-items-center animate__animated animate__faster container">

                    <div className="container-fluid w-75-product-list my-4 p-3 class_about_section" id="about_section">

                        <div className="h1 my-5 border-start ps-3 border-2 boder-dark">
                            About Us
                        </div>


                        <div className="row">
                            <div className="row">

                                <div className="col">

                                    <div className="paragraph py-2">
                                        Olivar International specializes in manufacturing and trading water purifying components, RO systems, and accessories. We believe in providing end customers with products that they can trust for pure and safe water for years to come. We pride ourselves in manufacturing and supplying high-quality products for water purification, understanding its importance for the society.

                                    </div>

                                    <div className="paragraph py-2">

                                        Our team of experienced professionals is dedicated to providing outstanding customer service and support. We work closely with our customers to understand their needs and to design and manufacture products that meet their specific requirements. We are always available to answer questions, provide advice, and offer support whenever our clients need it regarding our products and even beyond.
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div className="row mt-5">
                            <div className="col-md-12 col-sm-12 col-lg-6">
                                <div className="d-flex justify-content-center h2">
                                    Our Vision
                                </div>

                                <div className="paragraph py-2">
                                    We strive to be at the forefront of innovation, constantly seeking new and better ways to solve water purifying problems for our dealers and end users with the components manufacturing and trading. Our vision is to offer products that save time and money and extends quality beyond their use, setting the industry standard for reliability, durability, and effectiveness.  Our customers should get products that they can trust to deliver safe and healthy drinking water. At the heart of our vision is a commitment to sustainability and environmental responsibility.
                                </div>
                            </div>

                            <div className="col-md-12 col-sm-12 col-lg-6">
                                <div className="d-flex justify-content-center h2">
                                    Our Mission
                                </div>

                                <div className="paragraph py-2">
                                    Understanding the importance of water and its purity, we make sure that the components that we design and manufacture meet the needs of the end-users to get the best water quality with the durability of the components. We are trying to understand the problems and importance of the components and looking for the best solutions with long-lasting effects that serve our dealers and end-users.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}