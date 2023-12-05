import Image from "next/image";
import AboutUsImage from "../../../public/graphics/about_us.png"

export default function AboutUs() {
    return (
        <div className="light-section" id="about">
            <div className="container">
                <div className="section-title">
                    <h2>About Me</h2>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <Image src={AboutUsImage} alt="About ME" height={500} width={500} />
                    </div>
                    <div className="col-lg-6 about-text">
                        <p>
                        As a seasoned JavaScript Developer with over four years of specialized expertise in NodeJS and blockchain technologies, I bring a versatile skill set to web development. Proficient in crafting efficient solutions, my backend development skills shine in creating robust APIs, seamlessly integrating third-party services like Gmaps, PayPal, Stripe, Paystack, Twilio, socket.io, NATs, and more. I&apos;ve demonstrated adaptability across diverse industries, including on-demand services, ecommerce, and blockchain, where my proficiency extends to decentralized application development. 
                        </p>
                        <p>
                        On the frontend, I excel in frameworks like React, Angular, and NextJS, integrating services such as single sign-on, Google Maps, and Redux, with a keen focus on SEO optimization. Possessing solid deployment experience using Docker, Kubernetes, and cloud services like AWS, Azure, and Digital Ocean, I collaborate seamlessly with DevOps teams. My client-centric approach prioritizes satisfaction, offering optimal solutions and guidance for enduring partnerships. Ready to contribute to innovative projects, I&apos;m committed to ensuring they reach new heights, especially within the dynamic landscape of blockchain development. Let&apos;s build something remarkable together.
                        </p>
                        {/* <p>
                            My curiosity and interest in blockchain technology have led me to explore and gain knowledge of various blockchain applications, including decentralized finance (Defi), non-fungible tokens (NFTs), and public blockchain development. I have developed decentralized exchanges and liquidity pool management systems, which manage liquidity, rewards, and stacking implementations.
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}