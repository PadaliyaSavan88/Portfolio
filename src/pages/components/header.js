import Image from "next/image";
import Logo from "../../../public/graphics/header_logo.png"

export default function Headers() {
    return (
        <div className="header">
            <div className="container">
            <a href="#default" className="logo">
                <Image src={Logo} alt="logo" width={50} height={50} />
            </a>
            <div className="header-right">
                <a href="#home">Home</a>
                <a href="#portfolio">Portfolio</a>
                <a href="#about">About</a>
            </div>
            </div>
        </div>
    )
}