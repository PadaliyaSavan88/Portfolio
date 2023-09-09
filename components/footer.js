export default function Footer() {
    return (
        <nav className="navbar navbar-dark bg-theme">
            <div className="container-fluid w-75">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-6  text-left mb-4">
                                    <a className="navbar-brand" href="#">
                                        <object data="Assests/Image/blog_graphics/fav_icon.png" className="brand"> </object>
                                    </a>
                                </div>
                                <div className="col-lg-8 col-md-6 d-flex justify-content-end mb-4 ">
                                    <div className="justify-content-end">
                                        <div>
                                            <div className="row">
                                                <a className="nav-link nav-link-active" href="#">Home</a>
                                            </div>

                                            <div className="row">
                                                <a className="nav-link" href="#">About us</a>
                                            </div>
                                            <div className="row">
                                                <a className="nav-link" href="#">Contact us</a>
                                            </div>
                                            <div className="row">
                                                <a className="nav-link" href="#">Home</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 text-end text-left">
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
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}