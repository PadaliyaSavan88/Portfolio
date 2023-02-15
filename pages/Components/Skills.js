import { SiSolidity, SiJavascript, SiWeb3Dotjs, SiAngular, SiMongodb, SiNextdotjs, SiNodedotjs, SiExpress, SiAmazonaws, SiReact } from 'react-icons/si'
import { IconContext } from "react-icons";

const Skills = () => {
    return (
        <>
            {/* ======= Skills Section ======= */}
            <section id="skills" className="skills section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="section-title">
                        <h2>Skills</h2>
                        <p>I possess a wide range of expertise in various technologies related to building decentralized applications(dApps) such as Solidity, web3.js, react, angular, nodejs, mongodb, nextjs, truffle and chai.js. I am proficient in deploying those dApps on AWS and familiar with integrating various services like google maps, payment gateways in the dApps. I am experienced in integrating and working with various APIs like Google Maps and Payment gateways, making my dApps more interactive and robust. Overall, I am equipped with the necessary skills and knowledge to build high-quality, scalable and secure dApps that are integrated with various services and features.</p>
                    </div>


                    <div className='skills-svg'>
                        <IconContext.Provider className="skill-icon"  value={{ color: "#484545", className: "global-class-name" }}>
                            <SiSolidity />
                        </IconContext.Provider >
                        <IconContext.Provider className="skill-icon" value={{ color: "#f0db4f ", className: "global-class-name" }}>
                            <SiJavascript />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "black", className: "global-class-name" }}>
                            <SiWeb3Dotjs />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "#d4173b", className: "global-class-name" }}>
                            <SiAngular />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "#049024", className: "global-class-name" }}>
                            <SiMongodb />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "#000000", className: "global-class-name" }}>
                            <SiNextdotjs />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "#3c873a", className: "global-class-name" }}>
                            <SiNodedotjs />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "#000000", className: "global-class-name" }}>
                            <SiExpress />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "#e47911", className: "global-class-name" }}>
                            <SiAmazonaws />
                        </IconContext.Provider>
                        <IconContext.Provider className="skill-icon" value={{ color: "#61dafb", className: "global-class-name" }}>
                            <SiReact />
                        </IconContext.Provider>
                    </div>


                </div>
            </section>{/* End Skills Section */}
        </>
    )
}

export default Skills