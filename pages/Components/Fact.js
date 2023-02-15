const Facts = () => {
    return(
        <>
            {/* ======= Facts Section ======= */}
        <section id="facts" className="facts">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Facts</h2>
              <p>Providing excellent customer service is essential for any business looking to build and maintain a loyal customer base. This includes being responsive to customer needs and concerns, being knowledgeable about your products or services, and going above and beyond to ensure that your customers are satisfied.</p>
              <p>In addition to providing top-notch customer service, it&apos;s also important to consistently deliver high-quality projects to clients. This can be achieved by setting clear expectations, managing project timelines and budgets effectively, and keeping open lines of communication with clients throughout the project.</p>
            </div>

            <div className="row">

              <div className="col-lg-4 col-md-12">
                <div className="count-box">
                  <i className="bi bi-emoji-smile"></i>
                  <span data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter"></span>
                  <p>Happy Clients</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 mt-5 mt-md-0">
                <div className="count-box">
                  <i className="bi bi-journal-richtext"></i>
                  <span data-purecounter-start="0" data-purecounter-end="12" data-purecounter-duration="1" className="purecounter"></span>
                  <p>Projects</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 mt-5 mt-md-0">
                <div className="count-box">
                  <i className="bi bi-headset"></i>
                  <span data-purecounter-start="0" data-purecounter-end="500" data-purecounter-duration="1" className="purecounter"></span>
                  <p>Hours Of Support</p>
                </div>
              </div>

            </div>

          </div>
        </section>{/* End Facts Section */}
        </>
    )
}

export default Facts