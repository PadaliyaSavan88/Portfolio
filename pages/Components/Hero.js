import {SOCIAL} from '../../data';

const Hero = () => {
    return (
        <>
            {/* ======= Hero Section ======= */}
            <section id="hero" className="d-flex flex-column justify-content-center">
                <div className="container" data-aos="zoom-in">
                    <h1>Savan Padaliya</h1>
                    <p>I&apos;m <span className="typed">Full Stack Blockchain Developer</span></p>
                    <div className="social-links">
                        {/* <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                        <a href="#" className="instagram"><i className="bx bxl-github"></i></a>
                        <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                        <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a> */}

                        <a href={SOCIAL.TWITTER} className="twitter"><i className="bx bxl-twitter"></i></a>
                        <a href={SOCIAL.GITHUB} className="github"><i className="bx bxl-github"></i></a>
                        {/* <a href={SOCIAL.SKYPE} className="google-plus"><i className="bx bxl-skype"></i></a> */}
                        <a href={SOCIAL.LINKEDIN} className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </div>
            </section>{/* End Hero */}
        </>
    )
}

export default Hero