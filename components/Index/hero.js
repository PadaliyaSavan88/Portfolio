import Image from "next/image";

export default function Hero() {
    return (
        <div className="container-fluid bg-theme" id="first_row_">
            <div className="row  w-75 h-100 h-100-dvh ms-auto me-auto">
                <div className="col d-flex align-items-center justify-content-center">

                    <div className="fs-5 h-5 text-white">
                        <h1>The Blockchain Insider.</h1> <br /><h2>Pioneering Excellence Through Technology and Innovation</h2>
                    </div>
                </div>

                <div className="col  mx-auto my-auto">
                    <div className="w-100">
                        <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="img-fluid" alt="..." height={620} width={564} />
                    </div>
                </div>
            </div>
        </div>
    )
}