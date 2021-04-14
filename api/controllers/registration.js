// Server - CovidBit - Fast Pandas
// Connects to the registration form
// Created: 03, February, 2021, Teresa Costa

// Security/authentication
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Nodemailer
const emailService = require('../models/emailService/emailRegistration');
const emailServiceAdm = require('../models/emailService/emailRegistrationAdm');
// Schemas
const SmallBusiness = require('../schema/smallBusiness');
const crypto = require('crypto');

// Registration of a new business user
const registrationEmailDemo = 'covidbitreg@gmail.com';
const registrationForm = function (req, res) {
  let password, loginId, businessName, businessType, firstName, lastName, phoneNumber, location;
  let safetyMeasures = [];
  let registeredBy = req.body.registeredBy;

  if (registeredBy == true) { // registration by administrator
    password = 'fakefake';
    loginId = req.body.email;
    businessName = req.body.businessName;
    businessType = req.body.businessType;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    phoneNumber = req.body.businessPhone;
    location = req.body.businessLocation;
    resetPassword = crypto.randomBytes(64).toString('hex');
    resetPasswordExpires = Date.now() + 86400000;

  } else { //registration by user
    const { accountDetails, businessDetails } = req.body.user;
    password = accountDetails.password;
    loginId = accountDetails.email;
    businessName = accountDetails.businessName;
    businessType = accountDetails.businessType;
    firstName = accountDetails.firstName;
    lastName = accountDetails.lastName;
    phoneNumber = businessDetails.businessPhone;
    location = businessDetails.businessLocation;
    safetyMeasures = req.body.safetyMeasures;
    resetPassword = "";
    resetPasswordExpires = "";
  }
  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) { // checks if the user already exists
    if (error) {
      return res.status(404).json({ message: "Server error!" });
    }
    if (user) {
      return res.status(401).json({ message: "This business user already exists!" });
    }
    if (!user) {
      newBusiness = new SmallBusiness({
        loginId,
        password,
        businessName,
        firstName,
        lastName,
        businessType,
        phoneNumber,
        location,
        safetyMeasures,
        registeredBy
      });
      bcrypt.genSalt(saltRounds, function (error, salt) {  //sets password with hash
        if (error) {
          return res.status(404).json({ message: "Server error!" });
        }
        bcrypt.hash(newBusiness.password, salt, function (error, hash) {
          if (error) {
            return res.status(404).json({ message: "Server error!" });
          }
          if (hash) {
            newBusiness.password = hash;
            newBusiness.save(function (error) {
              if (error) {
                return res.status(404).json({ message: "Server error!" });
              }
              if (registeredBy == true) {
                const userToken = process.env.Host + 'reset-password/' + resetPassword;
                // "registrationEmailDemo" must be replace with "loginId" for live working
                emailServiceAdm.emailRegistrationAdm(registrationEmailDemo, newBusiness.businessName, userToken);
              } else {
                emailService.emailRegistration(registrationEmailDemo, newBusiness.businessName);
              }
              SmallBusiness.findOne({ "loginId": newBusiness.loginId }, function (error, user) {
                if (error) {
                  return res.status(404).json({ message: "Server error!" });
                }
                if (!user) {
                  return res.status(401).json({ message: "Incorrect LoginId!" });
                }
                if (user) {
                  const id = user._id;
                  return res.status(200).json({ id });
                }
              });
            })
          }
        });
      });
    };
  })
}

// Checks if a user already exists (for the first step of the registration form)
const checkUser = function (req, res) {
  const { accountDetails } = req.body;
  const loginId = accountDetails.email;
  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) {
    if (error) {
      return res.status(404).json({ message: "Server error!" });
    }
    if (user) {
      return res.status(401).json({ message: "This business user already exists!" });
    }
    return res.status(200).json({ loginId });
  })
}

module.exports = { registrationForm, checkUser };