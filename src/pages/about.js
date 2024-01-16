import Head from "next/head";
import Footer from "./components/footer";
import Headers from "./components/header";

export default function About() {
    return (
        <>
            <Head>
                <title>About Me - Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="title" content="About Me - Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer" />
                <meta name="description" content="Discover my journey as a passionate web developer, blockchain enthusiast, and JavaScript services provider. Learn about my interests, contributions to GDG Rajkot Chapter, and the services I offer in web development and blockchain projects." />
                <meta name="keywords" content="JavaScript Developer, Web Developer, NodeJS, React, Angular, Blockchain, Backend Development, Frontend Development, Deployment, Cloud Services, DevOps, Docker, Kubernetes, GDG Rajkot Chapter." />
                <meta name="language" content="English" />
                <link rel="canonical" href="https://www.savanpadaliya.com/about/" />

                <meta property="og:title" content="Savan Padaliya | JavaScript Expert | NodeJS, React, Angular | Blockchain Developer" />
                <meta property="og:site_name" content="Savan Padaliya | Full Stack Blockchain developer" />
                <meta property="og:url" content="https://www.savanpadaliya.com/about/" />
                <meta property="og:description" content="Discover my journey as a passionate web developer, blockchain enthusiast, and JavaScript services provider. Learn about my interests, contributions to GDG Rajkot Chapter, and the services I offer in web development and blockchain projects." />
                <meta property="og:image" content="/graphics/header_logo.png" />
            </Head>
            <Headers />
            <div className="about-section d-table container">
                <div className="page-header text-center d-table-cell">
                    <h1>JavaScript Expert And Blockchain Visionary, GDG Organiser, Igniting Minds By Knowledge Sharing</h1>
                    <p className="m-4 p-4">Welcome to my digital abode! I&apos;m Savan Padaliya, a seasoned Full Stack Developer deeply passionate about crafting innovative solutions. With a profound love for blockchain technology and a penchant for sharing knowledge, I embark on a journey that blends code, creativity, and community engagement.</p>
                </div>
            </div>
            <div className="what-i-do dark-section">
                <div className="container">
                    <div className="section-title">
                        <h2>Crafting Digital Excellence</h2>
                    </div>
                    <div>
                        <p>As a Full Stack Developer, my expertise spans the realms of backend and frontend development, with a keen focus on creating seamless user experiences. I specialize in blockchain applications, bringing decentralized innovations to the forefront of my work. Every line of code I write is infused with a commitment to excellence and a dedication to pushing the boundaries of what&apos;s possible in the digital realm.</p>
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