// Server - CovidBit - Fast Pandas
//loginForm for small business user
// Created: 03, February, 2021, Teresa Costa

// Security
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// MongoDb shemas
const SmallBusiness = require('../schema/smallBusiness');
const emailService = require('../models/emailService/emailForgotPassword');
const Administrator = require('../schema/administrator');

// Controls theloginForm for a business user and administrator
/*const googleMaps = function (req, res) {
   
    var address = "1600 Amphitheatre Parkway, Mountain View, CA";
    // Defining the request URL
    var options = {
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCfGrP0EDXKbazT9t2wkaDP9aKB4ykK2AU'
    }

    // Using the request package to pull the information using the options object defined above
    request(options, callback)

    // Callback function logging the request body in the console if it was successful
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);

            // Rendering test express file while passing in the response object to be used.
            //res.render('test', { response: response })
            return res.status(200).json(response);
        } else {
            return res.status(401).json({ message: "Google unavailable!" });
        }
    }
}*/


// npm install request --save
var request = require("request");

const googleMaps = function (req, res, next) {

    var API_KEY = "SAIzaSyCfGrP0EDXKbazT9t2wkaDP9aKB4ykK2AU";
    var BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    var address = "1600 Amphitheatre Parkway, Mountain View, CA";

    var url = BASE_URL + address + "&key=" + API_KEY;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(body);
            res.status(200).json(response);
        }
        else {
            res.status(401).json({ message: "Google unavailable!" });
        }
    });
};

module.exports = { googleMaps };
