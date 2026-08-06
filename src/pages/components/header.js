import Image from "next/image";
import Logo from "../../../public/graphics/header_logo.png";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export default function Headers() {
    return (
        <header className="site-header">
            <nav className="navbar navbar-expand-md" aria-label="Main navigation">
                <div className="container">
                    <Link href="/" className="navbar-brand">
                        <Image src={Logo} alt="Savan Padaliya: Technical Partner for Startup Founders" width={50} height={50} />
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
                            <li className="nav-item dropdown">
                                <Link
                                    href="/#how-i-help"
                                    className="nav-link dropdown-toggle"
                                    id="howIHelpDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    How I Help
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="howIHelpDropdown">
                                    <li><Link className="dropdown-item" href="/how-i-help/build-your-product">Build Your Product</Link></li>
                                    <li><Link className="dropdown-item" href="/how-i-help/scale-your-saas">Scale Your SaaS</Link></li>
                                    <li><Link className="dropdown-item" href="/how-i-help/ai-for-your-product">AI for Your Product</Link></li>
                                    <li><Link className="dropdown-item" href="/how-i-help/fractional-cto">Fractional CTO</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link href="/case-studies" className="nav-link">Case Studies</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/blogs" className="nav-link">Insights</Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item ms-md-3">
                                <Link
                                    href="/contact"
                                    onClick={() => trackEvent('cta_talk_product')}
                                    className="btn-primary-custom px-3 py-2"
                                    style={{ fontSize: '0.875rem', display: 'inline-block' }}
                                >
                                    Talk About Your Product
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
