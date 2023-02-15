// import { mail_notification } from "../../server"
import { useState } from "react"

const Contact = () => {
  const [emailState, setEmailState] = useState('')
  const [nameState, setNameState] = useState('')
  const [subjectState, setSubjectState] = useState('')
  const [contentState, setContentState] = useState('')

  let handleEmailChange = async (e) => {
    console.log(e.target.value)
    setEmailState(e.target.value)
  }

  let handleNameChange = async (e) => {
    console.log(emailState)
    setNameState(e.target.value)
  }

  let handleSubjectChange = async (e) => {
    setSubjectState(e.target.value)
  }

  let handleMessageChange = async (e) => {
    setContentState(e.target.value)
  }

  const sendMail = async () => {
    let data = {email: emailState, name: nameState, subject: subjectState, content: contentState}
    console.log(data)
    const response = await fetch(`http://localhost:8080/sendEmail?email=${encodeURIComponent(emailState)}&name=${encodeURIComponent(nameState)}&subject=${encodeURIComponent(subjectState)}&content=${encodeURIComponent(contentState)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    return await response.json();
  }

    return (
        <>
            {/* ======= Contact Section ======= */}
        <section id="contact" className="contact">
          <div className="container">

            <div className="section-title">
              <h2>Contact</h2>
            </div>

            <div className="row mt-1">

              <div className="col-lg-4">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>India</p>
                  </div>

                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>savanweb3@gmail.com</p>
                  </div>

                </div>

              </div>

              <div className="col-lg-8 mt-5 mt-lg-0">

                <form role="form" onSubmit={() => sendMail()} className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input type="text" name="name" className="form-control" id="name" onChange={handleNameChange} value={nameState} placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input type="email" className="form-control" name="email" id="email" onChange={handleEmailChange} value={emailState} placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" name="subject" id="subject" onChange={handleSubjectChange} value={subjectState} placeholder="Subject" required />
                  </div>
                  <div className="form-group mt-3">
                    <textarea className="form-control" name="message" rows="5" onChange={handleMessageChange} value={contentState} placeholder="Message" required></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                  </div>
                  <div className="text-center"><button type="submit">Send Message</button></div>
                </form>

              </div>

            </div>

          </div>
        </section>{/* End Contact Section */}
        </>
    )
}

export default Contact