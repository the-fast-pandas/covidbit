// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://geral:seneca@main.0qmqz.mongodb.net/covidbit?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(function(error) {
  if (error) throw error;
  else console.log("Conected to the database!");
});

//require('../schemas/user'); // The Schemas for the database