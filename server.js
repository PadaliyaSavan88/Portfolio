let express = require('express');
let cors = require('cors');
let nodemailer = require('nodemailer')
let bodyParser = require('body-parser')

let app = express()
app.use(cors())
app.use(bodyParser.json())
app.get('/sendEmail', (requestData, responseData) => {
    var email = 'theblockchaininsiderr@gmail.com';
    var password = 'mtfwqcmjmcauoeys';
    let data = {email: requestData.query.email, name: requestData.query.name, subject: requestData.query.subject, content: requestData.query.content}
    console.log(data)
    try {
        if (email != "" && password != "") {
            u_name = email;
            psw = password;

            smtp_configuration = {
                service: 'gmail',
                auth: {
                    user: u_name, // Your email id
                    pass: password // Your password
                }
            }
            sendToSender(smtp_configuration, email, email)
            sendToSelf(smtp_configuration, email, email, data)
        }
    } catch (error) {
        console.error(error);
    }
})

const sendToSender = async (smtp_configuration, from, to) => {
    var transporter = nodemailer.createTransport(smtp_configuration);
    var mailOptions = {
        from, // sender address
        to, // list of receivers
        subject: 'You Reached Out To Savan Padaliya', // Subject line
        text: 'Thankyou for reaching out to Savan Padaliya. I got you query and will be responding to you in short period of time.', //, /// plaintext body
        // html: html
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
        else console.log(info);
    });
}

const sendToSelf = async (smtp_configuration, from, to, data) => {
    var transporter = nodemailer.createTransport(smtp_configuration);
    var mailOptions = {
        from, // sender address
        to, // list of receivers
        subject: 'New Visitor', // Subject line
        text: `email: ${data.email}, name: ${data.name}, subject: ${data.subject}, content: ${data.content}`, //, /// plaintext body
        // html: html
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
        else console.log(info);
    });
}

app.listen(8080, () => {
    console.log('magic happens at 8080')
})