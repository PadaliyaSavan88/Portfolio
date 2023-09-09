import Image from "next/image";
import Link from "next/link";
import '../public/Assests/js/main'
import Head from "next/head";

export default function StaticHeader() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-theme" id="navbar_">
                <div className="container-fluid w-75 p-2">
                    <a className="navbar-brand" href="#">
                        <Image src="/Assests/Image/blog_graphics/fav_icon.png" id="logo" className="img-fluid" alt="..." height={60} width={60} />

                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-4">
                                <Link className="nav-link  active fs-4" aria-current="page" href="/#">Home</Link>
                            </li>
                            <li className="nav-item mx-4">
                                <Link className="nav-link fs-4" href="/blogs">Blogs</Link>
                            </li>
                            <li className="nav-item mx-4">
                                <Link className="nav-link fs-4" href="/services">Services</Link>
                            </li>
                            <li className="nav-item mx-4">
                                <Link className="nav-link fs-4" href="/allBlogs">All Blogs</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}