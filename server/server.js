// Server - CovidBit
// Created: 27, January, 2021
// Teresa Costa - Fast Pandas

const dotenv = require('dotenv');
dotenv.config({path: __dirname + '/.env'}); //variables
const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Access-Control-Expose-Headers, Content-Type, Accept");
  next();
  });

  //app.use(cors());
require('./api/models/database'); // Connects database
const routes = require('./api/routes/index');  


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//
app.use(cookieParser());

app.use(express.static(__dirname + "/dist/"));  // Directory for the 'hg build'
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/api', routes);  // Routes for our API (this is for the frontend conection)

// Initializes the server
const PORT = process.env.PORT ;
const server = app.listen(PORT, function (error) {
  if (error) throw error;
  else console.log("Application server now running on port", server.address().port);
});

module.exports = app;