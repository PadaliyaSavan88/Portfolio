import Image from "next/image";

export default function AboutUs() {
    return (
        <div className="row w-100 h-100-dvh d-flex justify-content-center align-items-center">
            <div className="col">
                <div className="row">
                    <span className="fs-3 my-5 h-3 d-flex align-items-center justify-content-center">
                        <b className="scale filter">
                            About Us
                        </b>
                    </span>
                </div>

                <div className="row">
                    <div className="col">
                        <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="img-fluid  mx-auto filter" alt="..." height={620} width={564} />
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                        <span>
                            About The BLockchain Insider
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}