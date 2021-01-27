//Server - CovidBit
//Created 27, January, 2021 - Teresa Costa - Fast Pandas

var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.json()); // Define the JSON parser as a default way to consume and produce data 
var distDir = __dirname + "/dist/"; //directcory for the 'hg build'
app.use(express.static(distDir));

// Database MongoDB (asynchronous)
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://geral:fast@main.0qmqz.mongodb.net/covidbit?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if(err) throw err;
    else console.log("Conected to database");

    //Write databse Insert/Update/Query code here..
    client.close();
});

// Initializes the application server
const PORT = 8080;
var server = app.listen(process.env.PORT || PORT, function () {
    var port = server.address().port;
    console.log("Application server now running on port", port);
});

//This is to check the application status
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

// Errors handler.
//function manageError(res, reason, message, code) {
//    console.log("Error: " + reason);
//    res.status(code || 500).json({ "error": message });
//}