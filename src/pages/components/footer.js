import Image from "next/image";

export default function Footer() {
    return (
        <div className="footer-basic">
            <footer>
                <div className="social">
                        <Image src='/icons/twitter.svg' className="social-icon" alt="JavaScript" title="JavaScript" width={30} height={30} />
                        <Image src='/icons/linkedin.svg' className="social-icon" alt="JavaScript" title="JavaScript" width={30} height={30} />
                </div>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#home">Home</a></li>
                    <li className="list-inline-item"><a href="#portfolio">Portfolio</a></li>
                    <li className="list-inline-item"><a href="#about">About</a></li>
                    <li className="list-inline-item"><a href="#skills">Skills</a></li>
                    {/* <li className="list-inline-item"><a href="#">Privacy Policy</a></li> */}
                </ul>
                <p className="copyright">Company Name © 2018</p>
            </footer>
        </div >
    )
}