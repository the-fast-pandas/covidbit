// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

const mongoose = require('mongoose');
const uri = "mongodb+srv://geral:seneca@main.0qmqz.mongodb.net/covidbit?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database Conected!');
});

//require('../schemas/user'); // The Schemas for the database*/

