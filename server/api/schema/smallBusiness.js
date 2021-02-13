// Server - CovidBit - Fast Pandas
// Created: 01, February, 2021, Teresa Costa

const mongoose = require("mongoose");

const SmallBusinessSchema = mongoose.Schema({
  loginId: {   // this is the email
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('smallbusiness', SmallBusinessSchema, 'SmallBusiness');