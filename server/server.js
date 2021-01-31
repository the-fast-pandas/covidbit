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
    to: 'tcovidbitreg@gmail.com',
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