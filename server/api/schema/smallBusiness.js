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
    required: true,
  },
  businessName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  }, 
  lastName: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  website:{
    type: String,
    default: " "
  },
  safetyMeasures: {
    type: Array,
    default: []
  },
  resetPassword:{
    type: String,
    default: ""
  },
  resetPasswordExpires:{
    type: Date,
    default: ""
  },
  registeredBy:{
    type:Boolean,
    default: false
  }
});

module.exports = mongoose.model('smallbusiness', SmallBusinessSchema, 'SmallBusiness');