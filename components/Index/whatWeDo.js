import Image from "next/image";

export default function WhatWeDo() {
    return (
        <div className="row w-100 h-100-dvh d-flex justify-content-center align-items-center">
            <div className="col">
                <div className="row">
                    <span className="fs-3 my-5 h-3 d-flex align-items-center justify-content-center">
                        <b className="scale filter">
                            What We Do?
                        </b>
                    </span>
                </div>

                <div className="row">
                    <div className="col d-flex align-items-center justify-content-center">
                        <span>
                        At TheBlockchainInsider, we are a cohesive team driven by an unwavering passion for delivering solutions that precisely meet your needs. Our dedicated team offers a comprehensive range of services, including blockchain solutions, web application development, mobile application development, AI/ML, data-related services, and software development. With each project, we bring a profound commitment to innovation and a client-centric approach that sets us apart.
                        <br />
                        <br />
                        Our array of services covers an extensive spectrum of your business needs. Whether you require blockchain integration to enhance transparency and security, full-stack web or mobile application development for a digital presence, AI and ML solutions for data-driven insights, data services for informed decision-making, or custom software development, we have the expertise to deliver. At TheBlockchainInsider, we don&apos;t just offer services; we provide tailored solutions, partnering with you to unlock your business&apos;s full potential in the ever-evolving digital landscape.
                        </span>
                    </div>

                    <div className="col">
                        <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="img-fluid  mx-auto filter" alt="..." height={620} width={564} />
                    </div>
                </div>
            </div>
        </div>
    )
}