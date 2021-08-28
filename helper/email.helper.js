const nodemailer = require('nodemailer')

const stmpConfig = {
    service: 'gmail',
    auth: {
        user: "abctech22@gmail.com",
        pass: "/[A-Z]{8}^/"
    }
}

const activationEmail = (recEmail, textEmail) => {
    try {
        const transporter = nodemailer.createTransport(stmpConfig)
        let mailOPtions = {
            from: "abctech22@gmail.com",
            to: recEmail,
            subject: "Welcome in E-Contract",
            text: textEmail
        }
        transporter.sendMail(mailOPtions)
    }
    catch (e) {
        console.log(e)
    }
}


module.exports = activationEmail