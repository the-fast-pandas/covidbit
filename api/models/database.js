// Server - CovidBit - Fast Pandas
// Database Connection - MongoDB
// Created: 31, January, 2021, Teresa Costa

const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology:true,
  useNewUrlParser: true,
  useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log('Database Conected!');
});