// Server - CovidBit - Fast Pandas
// Created: 31, January, 2021, Teresa Costa

const nodemailer = require("nodemailer");

const email = function (businessName, email, emailContent, subject) {

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
        subject: subject,
        html: '<p style="font-size:20px;color:darkblue;font-family: Georgia, serif;">Hello ' 
              + businessName + '</p>' + emailContent + '<img src="cid:logo"style="width:100px;height:100px;">',
        attachments: [{
            filename: 'covidbit-logo.png',
            path: __dirname + '/covidbit-logo.png',
            cid: 'logo'
        }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw error;
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {  email };