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
                            TheBlockchainInsider is a dynamic and diverse consortium of seasoned professionals, unified by an unyielding passion for technology, innovation, and the expansive potential of blockchain. Our team embodies a rich tapestry of expertise spanning diverse domains, all coalescing around a common mission: to guide businesses into the digital age, empowering them to excel within an ever-evolving landscape.
                            <br />
                            <br />
                            Our team comprises accomplished blockchain specialists, creative content creators, full-stack web developers, and skilled software engineers. We collaboratively apply our vast expertise to craft tailored solutions, transcending traditional service roles to become strategic partners in your journey. Innovation is at our core, propelling businesses to leadership in an ever-changing landscape. Welcome to TheBlockchainInsider, where innovation and excellence lead your digital success.
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}