const nodemailer = require("nodemailer");

const stmpConfig = {
    service: "gmail",
    auth: {
        user: "abctech22@gmail.com",
        pass: "/[A-Z]{8}^/",
    },
};

const activationEmail = (userData, verificationCode) => {
    try {
        const transporter = nodemailer.createTransport(stmpConfig);
        let mailOPtions = {
            from: "abctech22@gmail.com",
            to: userData.email,
            subject: "Welcome in E-Contract",
            text: `Hello <strong>${userData.fristName}, Thanks so much for joining E-contract we are glad that you want to join us! Please use the verification code to verify your account, your verification code is ${verificationCode} go to "http://localhost:3000/activate/${userData._id} to active Your Account`,
        };
        transporter.sendMail(mailOPtions);
    } catch (e) {
        console.log(e);
    }
};

module.exports = activationEmail;
