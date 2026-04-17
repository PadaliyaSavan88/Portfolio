import Image from "next/image";
import Logo from "../../../public/graphics/header_logo.png";
import Link from "next/link";

export default function Headers() {
    const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

    return (
        <header className="site-header">
            <nav className="navbar navbar-expand-md" aria-label="Main navigation">
                <div className="container">
                    <Link href="/" className="navbar-brand">
                        <Image src={Logo} alt="Savan Padaliya — Senior Full Stack Developer" width={50} height={50} />
                    </Link>
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-md-center">
                            <li className="nav-item">
                                <Link href="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/#portfolio" className="nav-link">Work</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/#services" className="nav-link">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/blogs" className="nav-link">Blog</Link>
                            </li>
                            <li className="nav-item ms-md-3">
                                <a
                                    href={calendlyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-primary-custom px-3 py-2"
                                    style={{ fontSize: '0.875rem', display: 'inline-block' }}
                                >
                                    Book a Call
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
