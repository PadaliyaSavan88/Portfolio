export default function Hero() {
    return (
        <div className="container" id="home">
            {/* <div className="hero-image">
                <div className="hero-text">
                    <h1 style={{ fontSize: '50px' }}>I am Savan Padaliya</h1>
                    <p>And I&apos;m a Full Stack Blockchain Developer</p>
                    <button>Hire me</button>
                </div>
            </div> */}
            <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                    <div className="hero-text">
                        <h1 style={{ fontSize: '50px' }}>I am Savan Padaliya</h1>
                        <p>And I&apos;m a Full Stack Blockchain Developer</p>
                        {/* <button>Hire me</button> */}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="hero-image"></div>
                </div>
            </div>
        </div>
    )
}