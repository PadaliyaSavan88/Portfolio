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
                            What Actually Blockchain Insider Does?
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