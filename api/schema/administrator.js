// Server - CovidBit - Fast Pandas
// Schema for Administrator - MongoDB
// Created: 08, February, 2021, Teresa Costa

const mongoose = require("mongoose");

const AdministratorSchema = mongoose.Schema({
  loginId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('administrator', AdministratorSchema, 'Administrator');