import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="footer-basic">
            <footer>
                <div className="social">
                    <Link href={`https://twitter.com/padaliya_savan`} className="text-decoration-none">
                        <Image src='/icons/twitter.svg' className="social-icon" alt="JavaScript" title="JavaScript" width={30} height={30} />
                    </Link>
                    <Link href={`https://www.linkedin.com/in/savanpadaliya/`} className="text-decoration-none">
                        <Image src='/icons/linkedin.svg' className="social-icon" alt="JavaScript" title="JavaScript" width={30} height={30} />
                    </Link>
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item"><Link href="/#home">Home</Link></li>
                    <li className="list-inline-item"><Link href="/#portfolio">Portfolio</Link></li>
                    <li className="list-inline-item"><Link href="/about">About</Link></li>
                    <li className="list-inline-item"><Link href="/blogs">Blogs</Link></li>
                    {/* <li className="list-inline-item"><Link href="#">Privacy Policy</Link></li> */}
                </ul>
                {/* <p className="copyright">Company Name © 2018</p> */}
            </footer>
        </div >
    )
}