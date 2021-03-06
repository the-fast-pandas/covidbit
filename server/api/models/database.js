// Server - CovidBit - Fast Pandas
// Created: 31, January, 2021, Teresa Costa

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://geral:seneca@main.0qmqz.mongodb.net/covidbit?retryWrites=true&w=majority", { useUnifiedTopology:true,
  useNewUrlParser: true,
  useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Database Conected!');
});