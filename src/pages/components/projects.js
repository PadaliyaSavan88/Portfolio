export default function Projects() {
    return (
        <div className="dark-section" id="portfolio">
            <div className="container">
                <div className="section-title">
                    <h2>The Projects I&apos;ve Shaped and Strengthened</h2>
                </div>
                <div className="cards-section row">
                    <div className="basic-card basic-card-light col-md-3">
                        <div className="card-content">
                            <span className="card-title">E-commerce</span>
                            <p className="card-text">
                                Created an e-commerce website for a stationary products, where several produts where displayed catagory wise, along with multiple images. Used a Stripe as a payment gateway.
                            </p>
                        </div>
                    </div>
                    <div className="basic-card basic-card-light col-md-3">
                        <div className="card-content">
                            <span className="card-title">Story Writing</span>
                            <p className="card-text">
                                It was a SaaS product where author can write a story books that can chapterwise or a chapter less. User can see the books written by authours and buy whole book or can buy a specific chapter.
                            </p>
                        </div>
                    </div>
                    <div className="basic-card basic-card-light col-md-3">
                        <div className="card-content col-md-12">
                            <span className="card-title">Video Streaming</span>
                            <p className="card-text">
                                Created a application to stream videos on the platform. Whole movies can be streamed there, user can search videos on the basis of actors, directors, genere. Integrated a Kafka data streaming to smooth video streaming
                            </p>
                        </div>
                    </div>
                    <div className="basic-card basic-card-light col-md-3">
                        <div className="card-content">
                            <span className="card-title">On-demand Services</span>
                            <p className="card-text">
                                Contributed to a on-demand services where user can book cabs, order food from registered stores, can book blue collar services, where GoogleMaps were integrated.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}