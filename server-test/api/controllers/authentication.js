// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

var email = require('../models/email');
var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://geral:seneca@main.0qmqz.mongodb.net/covidbit?retryWrites=true&w=majority";

const loginUser = function (req, res) {
  //const user = req.body.loginId;
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    const db = client.db('covidbit');
    db.collection('Administrator', function (error, collection) {
      if (err) throw err;
      collection.findOne({ "loginId": "teresa" }, function (error, user) {
        if (error) throw error;
        console.log(user);
        if (user) {
          res.status(200).json({ status: "I am here!" });
        } else {
          res.status(200).json({ status: "Nobody here!" });
        }
      });

    });

  });
};

const registerUser = function (req, res) {
  //const user = req.body.name;
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    var db = client.db('covidbit');
    db.collection('SmallBusiness', function (error, collection) {
      if (error) throw error;
      collection.insertOne(
        { businessName: 'Pizza Pizza', loginId: 'myemail@provider.com', password: 'fake' },
        function (error) {
          if (error) throw error;
          else res.status(200).json({ status: "Small Business added!" });
          email.sendEmail('myemail@provider.com', email.registrationInvite);
        });
    });
  })
};

module.exports = { loginUser, registerUser };