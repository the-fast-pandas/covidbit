// Server - CovidBit - Fast Pandas
// REGISTRATION for small business user
// Created: 03, February, 2021, Teresa Costa
// Modified: 08, February, 2021, Teresa Costa: frontend integration, registerUser changed to match schema

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const emailService = require('../models/email');
const saltRounds = 10;

const registerUser = function (req, res) {

  const { accountDetails, businessDetails, safteyMeasures } = req.body;
  console.log(req.body);

  const password = accountDetails.password;
  const loginId = accountDetails.email;
  const businessName = accountDetails.businessName;
  const businessType = accountDetails.businessType;
  const firstName = accountDetails.firstName;
  const lastName = accountDetails.lastName;

  const phoneNumber = businessDetails.businessPhone;
  const location = businessDetails.businessLocation;
  const safetyM = safteyMeasures;

  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) {
    if (error) {
      throw error;
    }
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
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
      bcrypt.genSalt(saltRounds, function (error, salt) {
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
              emailService.email(newBusiness.businessName, 'covidbitreg@gmail.com', emailService.registrationInvite, 'COVIDBIT Website Registration Request');
              const payload = {
                user: {
                  id: newBusiness.id
                }
              };
              const token = jwt.sign(payload, "ilikemypandasfast", { expiresIn: 1000 });
              return res.status(200).json({ token });
            });
          }
        });
      });
    };
  })
}

const checkUser = function (req, res) {
  const { accountDetails, businessDetails, safteyMeasures } = req.body;
  const loginId = accountDetails.email;
  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) {
    if (error) {
      throw error;
    }
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    return res.status(200).json({ loginId });
  })
}

module.exports = { registerUser, checkUser };