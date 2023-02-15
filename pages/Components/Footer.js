import {SOCIAL} from '../../data'

const Footer = () => {
    return (
        <>
            {/* ======= Footer ======= */}
            <footer id="footer">
                <div className="container">
                    <h3>Savan Padaliya</h3>
                    <p>An Enthusiast Builder In Decentralised World.</p>
                    <div className="social-links">
                        <a href={SOCIAL.TWITTER} className="twitter"><i className="bx bxl-twitter"></i></a>
                        {/* <a href="SOCIAL.TWITTER" className="facebook"><i className="bx bxl-facebook"></i></a> */}
                        <a href={SOCIAL.GITHUB} className="github"><i className="bx bxl-github"></i></a>
                        {/* <a href={SOCIAL.SKYPE} className="google-plus"><i className="bx bxl-skype"></i></a> */}
                        <a href={SOCIAL.LINKEDIN} className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </div>
            </footer>{/* End Footer */}
        </>
    )
}

export default Footer