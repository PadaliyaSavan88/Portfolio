import Image from "next/image";
import Logo from "../../../public/graphics/header_logo.png"
import Link from "next/link";

export default function Headers() {
    return (
        <div className="header">
            <div className="container">
            <Link href="/#default" className="logo">
                <Image src={Logo} alt="logo" width={50} height={50} />
            </Link>
            <div className="header-right">
                <Link href="/">Home</Link>
                <Link href="/#portfolio">Portfolio</Link>
                <Link href="/about">About</Link>
                <Link href="/blogs">Blogs</Link>
            </div>
            </div>
        </div>
    )
}