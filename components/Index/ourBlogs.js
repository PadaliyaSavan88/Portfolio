import Image from "next/image";

export default function OurBlogs() {
    return (
        <div className="row w-100 h-100-dvh d-flex justify-content-center align-items-center">
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="">
                            <div className="m-5">
                                <div className="row row-cols-1 row-cols-md-3 g-4 ">
                                    <div className="col ">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a short card.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="carousel-item">
                        <div className="">
                            <div className="m-5">
                                <div className="row row-cols-1 row-cols-md-3 g-4 ">
                                    <div className="col ">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a short card.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="carousel-item">
                        <div className="">
                            <div className="m-5">
                                <div className="row row-cols-1 row-cols-md-3 g-4 ">
                                    <div className="col ">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a short card.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card h-100 scale">
                                            <Image src="/Assests/Image/blog_graphics/slider_graphics.png" className="card-img-top" alt="..." height={240} width={164} />
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="carousel-indicators m-4">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
            </div>
        </div>
    )
}