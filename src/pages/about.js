import Footer from "./components/footer";
import Headers from "./components/header";

export default function About() {
    return (
        <>
            <Headers />
            <div className="about-section d-table container">
                <div className="page-header text-center d-table-cell">
                    <h1>JavaScript Expert And Blockchain Visionary, GDG Organiser, Igniting Minds By Knowledge Sharing</h1>
                    <p className="m-4 p-4">Welcome to my digital abode! I'm Savan Padaliya, a seasoned Full Stack Developer deeply passionate about crafting innovative solutions. With a profound love for blockchain technology and a penchant for sharing knowledge, I embark on a journey that blends code, creativity, and community engagement.</p>
                </div>
            </div>
            <div className="what-i-do dark-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Crafting Digital Excellence</h2>
                    </div>
                    <div>
                        <p>As a Full Stack Developer, my expertise spans the realms of backend and frontend development, with a keen focus on creating seamless user experiences. I specialize in blockchain applications, bringing decentralized innovations to the forefront of my work. Every line of code I write is infused with a commitment to excellence and a dedication to pushing the boundaries of what's possible in the digital realm.</p>
                        {/* <p>As a Full Stack Developer, my expertise spans the realms of backend and frontend development, with a keen focus on creating seamless user experiences. I specialize in blockchain applications, bringing decentralized innovations to the forefront of my work. Every line of code I write is infused with a commitment to excellence and a dedication to pushing the boundaries of what's possible in the digital realm.</p> */}
                    </div>
                </div>
            </div>
            <div className="light-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Fueling Passion, Embracing Obsession</h2>
                    </div>
                    <div>
                        <p>Beyond the code, my journey is fueled by a deep passion for technology. I find immense joy and fulfillment in sharing insights and discoveries, often taking the stage as a speaker at technical festivals. This passion is further exemplified through my obsession with contributing to open-source projects, fostering collaboration and knowledge-sharing within the global developer community.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}