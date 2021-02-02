// Server - CovidBit
// Created: 27, January, 2021
// Teresa Costa - Fast Pandas

const express = require("express");
const bodyParser = require('body-parser'); 
const passport = require('passport');
const favicon = require('serve-favicon');

const database = require('./api/models/database');
const routes = require('./api/routes/index');  

const app = express();
app.use(passport.initialize());
app.use(bodyParser.json()); // Define the JSON parser as a default way to conect to data 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/dist/"));  // Directory for the 'hg build'
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/api', routes);  // Routes for our API (this is for the frontend conection)

// Initializes the server
const server = app.listen(process.env.PORT || 3000, function (error) {
  if (error) throw error;
  else console.log("Application server now running on port", server.address().port);
});

module.exports = app;

