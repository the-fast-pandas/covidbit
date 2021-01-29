//Server - CovidBit
//Created 27, January, 2021 - Teresa Costa - Fast Pandas

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Define the JSON parser as a default way to conect to data 

// Directory for the 'hg build'
app.use(express.static(__dirname + "/dist/"));

// Email service
const nodemailer = require("nodemailer");
const ejs = require('ejs');

// Commented code is for testing
// Generate SMTP service account from ethereal.email
// Use etheral for testing: https://ethereal.email/messages
/*nodemailer.createTestAccount((err, account) => {
    if (err) {throw error;}
    else { 
        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object (this is generic)
        //const transporter = nodemailer.createTransport({
        //    host: account.smtp.host,
        //    port: account.smtp.port,
        //   secure: account.smtp.secure,
        //    auth: {
        //        user: account.user,
        //        pass: account.pass
        //    }
        //});

        // This is for testing (not a real account) 
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'josefina.lakin@ethereal.email',
                pass: 'CAc6twyJKr7TP79PFQ'
            }
        });

        // Message object
        const message = {
            from: 'Sender Name <sender@example.com>',
            to: 'Recipient <recipient@example.com>',
            subject: 'Nodemailer is unicode friendly ✔',
            text: 'Hello to myself!',
            html: '<p><b>Hello</b> to myself!</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) throw error;
            else {
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            }
        });
    }
});*/

// This is the usable code for email service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'covidbitreg@gmail.com',
      pass: 'FASTPANDAS'
    }
  });
  
  const mailOptions = {
    from: 'covidbitreg@gmail.com',
    to: 'tcpaixao-costa@myseneca.ca, Valya.dersen@gmail.com, jkofitee@hotmail.com, janya330@gmail.com, adilahismail4@gmail.com',
    subject: 'Hi from the COVIDBIT App',
    text: 'Hello World! Tell Teresa that you received this email! She will be very happy. :)'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

// Database MongoDB (asynchronous)
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://geral:seneca@main.0qmqz.mongodb.net/covidbit?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(error => {
    if(error) throw error;
    else console.log("Conected to the database!");

    //Write databse Insert/Update/Query code

    client.close();
});

// Initializes the application server
const server = app.listen(process.env.PORT || 8080, function (error) {
    if(error) throw error;
    else console.log("Application server now running on port", server.address().port);
});

// This is to check the application status
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "I am alive!" });
});