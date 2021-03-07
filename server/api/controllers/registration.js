// Server - CovidBit - Fast Pandas
// REGISTRATION for small business user
// Created: 03, February, 2021, Teresa Costa
// Modified: 08, February, 2021, Teresa Costa: frontend integration, registerUser changed to match schema
//           04, March, 2021, Teresa Costa: support administrator

const bcrypt = require('bcrypt');
const saltRounds = 10;
// Nodemailer
const email = require('../templates/registrationUser');
const emailAdmin = require('../templates/resgistrationAdmin');
const emailService = require('../models/email');
// Schemas
const SmallBusiness = require('../schema/smallBusiness');

// Registration of a new business user
const registerUser = function (req, res) {

  let password, loginId, businessName, businessType;
  let firstName, lastName, phoneNumber, location, safetyM;
  let emailSend;

  if (req.body.registeredBy == true) {

    password = 'fakefake';
    loginId = req.body.email;
    businessName = req.body.businessName;
    businessType = req.body.businessType;
    firstName = 'First';
    lastName = 'Second';
    phoneNumber = req.body.businessPhone;
    location = req.body.businessLocation;
    safetyM = [];
    emailSend = emailAdmin.confirmRegistrationAdm;

  } else {

    const { accountDetails, businessDetails, safteyMeasures } = req.body;

    password = accountDetails.password;
    loginId = accountDetails.email;
    businessName = accountDetails.businessName;
    businessType = accountDetails.businessType;
    firstName = accountDetails.firstName;
    lastName = accountDetails.lastName;
    phoneNumber = businessDetails.businessPhone;
    location = businessDetails.businessLocation;
    safetyM = safteyMeasures;
    emailSend = email.confirmRegistration;
  }
  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) { // checks if the user already exists
    if (error) {
      throw error;
    }
    if (user) {
      return res.status(401).json({ message: "This business already exists!" });
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
        safetyM
      });
      bcrypt.genSalt(saltRounds, function (error, salt) {  //sets password with hash
        if (error) {
          throw error;
        }
        bcrypt.hash(newBusiness.password, salt, function (error, hash) {
          if (error) {
            throw error;
          }
          if (hash) {
            newBusiness.password = hash;
            newBusiness.save(function (error) {
              if (error) {
                throw error;
              }
              emailService.email(newBusiness.businessName, 'covidbitreg@gmail.com', emailSend, 'COVIDBIT Website Registration Request');
              return res.status(200).json({ newBusiness });
            });
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
      throw error;
    }
    if (user) {
      return res.status(401).json({ message: "This business already exists!" });
    }
    return res.status(200).json({ loginId });
  })
}

module.exports = { registerUser, checkUser };