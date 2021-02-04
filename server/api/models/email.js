// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

const nodemailer = require("nodemailer");

// Standard Emails
const registrationInvite = 'Hello World! Lets be a part of this!';
const confirmationRegistration = 'You are a part of this!';


const sendEmail = function (email, emailContent) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'covidbitreg@gmail.com',
            pass: 'FASTPANDAS'
        }
    });
    const mailOptions = {
        from: 'covidbitreg@gmail.com',
        to: email,
        subject: 'Hi from the COVIDBIT App',
        text: emailContent
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) throw error;
        else console.log('Email sent: ' + info.response);
    });
}

module.exports = { registrationInvite, confirmationRegistration, sendEmail };