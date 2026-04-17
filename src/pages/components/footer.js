import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer-basic">
            <div>
                <div className="social">
                    <Link href={`https://twitter.com/padaliya_savan`} className="text-decoration-none">
                        <Image src='/icons/twitter.svg' className="social-icon" alt="Twitter" title="Follow on Twitter" width={30} height={30} />
                    </Link>
                    <Link href={`https://www.linkedin.com/in/savanpadaliya/`} className="text-decoration-none">
                        <Image src='/icons/linkedin.svg' className="social-icon" alt="LinkedIn" title="Connect on LinkedIn" width={30} height={30} />
                    </Link>
                </div>
                <nav aria-label="Footer navigation"><ul className="list-inline">
                    <li className="list-inline-item"><Link href="/#home">Home</Link></li>
                    <li className="list-inline-item"><Link href="/#services">Services</Link></li>
                    <li className="list-inline-item"><Link href="/#portfolio">Work</Link></li>
                    <li className="list-inline-item"><Link href="/#skills">Skills</Link></li>
                    <li className="list-inline-item"><Link href="/#contact">Contact</Link></li>
                    <li className="list-inline-item"><Link href="/about">About</Link></li>
                    <li className="list-inline-item"><Link href="/blogs">Blog</Link></li>
                </ul></nav>
                <p className="copyright">© {new Date().getFullYear()} Savan Padaliya. All rights reserved.</p>
            </div>
        </footer>
    )
}