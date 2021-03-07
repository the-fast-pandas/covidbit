// Server - CovidBit - Fast Pandas
// Created: 31, January, 2021, Teresa Costa

const nodemailer = require("nodemailer");

const registrationInvite = `
        <p>This email is being sent to you on behalf of The Fast Pandas, 
        a group of aspiring software developers from Seneca College.<br>
        As we all know, the coronavirus pandemic has changed Canadian lives forever, 
        from how we live to how we work and how we interact with others. 
        It has had a particularly negative impact on local businesses.</p>
        <p> We have spent the last few months creating the COVIDBIT, 
        that we hope will relieve some of the pressure put on businesses during this time.<br>
        This platform will provide you with the opportunity to advertise your businesses’ 
        safety measures, track infections and be certified as a safe business. <br>
        You can also expect to gain access to contact tracing methods and schedule appointments.</p>
        <p> We have selected your business to join our web application. <br>
        We hope that our project will provide relief to your business so that you can 
        continue to serve your community. <br>
        Feel free to contact us at this email if you 
        have any questions.</p> 
        <p> You can register in our website
        <a href="http://localhost:4200/registration-form/"> here </a> </p>
        <p>Sincerely,</p>  

        <p style="font-size:14px;color:darkblue;font-family: Georgia, serif;"><i>The Fast Pandas</i> <br>
        
        Creating a safer world together</p>`;

const confirmationRegistration = 'You are a part of this!';


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

module.exports = { registrationInvite, confirmationRegistration, email };