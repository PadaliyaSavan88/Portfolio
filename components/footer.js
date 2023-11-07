import Link from "next/link";

export default function Footer() {
    return (
        <nav className="navbar navbar-dark bg-theme">
            <div className="container-fluid w-75">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-6  text-left mb-4">
                                    <Link className="navbar-brand" href="/#">
                                        <object data="images/210 x 210.png" className="brand"> </object>
                                    </Link>
                                </div>
                                <div className="col-lg-8 col-md-6 d-flex justify-content-end mb-4 ">
                                    <div className="justify-content-end">
                                        <div>
                                            <div className="row">
                                                <Link className="nav-link nav-link-active" href="/#">Home</Link>
                                            </div>

                                            <div className="row">
                                                <Link className="nav-link" href="/allBlogs">Blogs</Link>
                                            </div>
                                            <div className="row">
                                                <Link className="nav-link" href="/services">Services</Link>
                                            </div>
                                            <div className="row">
                                                <Link className="nav-link" href="/aboutUs">About Us</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-md-12 text-end text-left">
                            <div>
                                <div className="text-white">
                                    <address>
                                        14, Pravin silk mill, <br />
                                        beside garden vareli mill, <br />
                                        kadodara, <br />
                                        surat-39432<br />
                                    </address>
                                    <p>
                                        +91 1234567890
                                    </p>
                                    <p>
                                        info@SD.com
                                    </p>
                                    <p>
                                        www.SD.com
                                    </p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}