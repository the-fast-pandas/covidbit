// Server - CovidBit - Fast Pandas
// REGISTRATION for small business user
// Created: 03, February, 2021, Teresa Costa

const bcrypt = require('bcrypt');
const saltRounds = 10;
// Nodemailer
const emailService = require('../models/emailService/emailRegistration');
const emailServiceAdm = require('../models/emailService/emailRegistrationAdm');
// Schemas
const SmallBusiness = require('../schema/smallBusiness');

// Registration of a new business user
const registerUser = function (req, res) {

  let password, loginId, businessName, businessType, firstName, lastName, phoneNumber, location, safetyM;

  let registered = req.body.registeredBy;

  if (registered == true) {

    password = 'fakefake';
    loginId = req.body.email;
    businessName = req.body.businessName;
    businessType = req.body.businessType;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    phoneNumber = req.body.businessPhone;
    location = req.body.businessLocation;
    safetyM = [];
    registeredBy = registered;
    resetPassword = crypto.randomBytes(64).toString('hex');
    resetPasswordExpires = Date.now() + 86400000;

  } else {
    const { accountDetails, businessDetails, safetyMeasures } = req.body;
    password = accountDetails.password;
    loginId = accountDetails.email;
    businessName = accountDetails.businessName;
    businessType = accountDetails.businessType;
    firstName = accountDetails.firstName;
    lastName = accountDetails.lastName;
    phoneNumber = businessDetails.businessPhone;
    location = businessDetails.businessLocation;
    safetyM = safetyMeasures;
    registeredBy = false;
    resetPassword = "";
    resetPasswordExpires = "";
  }

  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) { // checks if the user already exists
    if (error) {
      throw error;
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
        safetyM,
        registeredBy
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
              if (registered) {
                const userToken = 'http://localhost:4200/reset-password/' + token;
                emailServiceAdm.emailRegistrationAdm('covidbitreg@gmail.com', newBusiness.businessName, userToken);
              } else {
                emailService.emailRegistration('covidbitreg@gmail.com', newBusiness.businessName);
              }
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
      return res.status(401).json({ message: "This business user already exists!" });
    }
    return res.status(200).json({ loginId });
  })
}

module.exports = { registerUser, checkUser };