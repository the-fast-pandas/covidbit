// Server - CovidBit
// Created: 01, February, 2021
// Teresa Costa - Fast Pandas

const mongoose = require("mongoose");

const SmallBusinessSchema = mongoose.Schema({
<<<<<<< HEAD
  loginId: {
=======
  loginId: {   // this is the email
>>>>>>> 7ffa663 (map visualization 1)
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