// Server - CovidBit - Fast Pandas
// ADMINISTRATOR DASHBOARD
// Created: 28, February, 2021, Teresa Costa

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const emailService = require('../models/email');
const saltRounds = 10;

const registerUserAdm = function (req, res) {

  const {email, businessName, businessType, businessPhone, businessLocation, website} = req.body;

  const loginId = email;
  const password = 'fakefake';
  const firstName = 'First';
  const lastName = 'Second';
  const safetyM = [];
  const phoneNumber =  businessPhone;
  const location = businessLocation;
  console.log(req.body);

  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) {
    if (error) {
      throw error;
    }
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    console.log("I am here");
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
      console.log(newBusiness);
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

const searchUserAdm = function (req, res) {
    const { name } = req.body;
    SmallBusiness.find({ "businessName": { $regex: name }}, function (error, users) {
        if (error) {
            throw error;
        }
        if (!users) {
            return res.status(401).json({ message: "No user in database" });
        }
        if (users) {
            console.log(users);
            return res.status(200).json({ users });
        }
    })
}

module.exports = { registerUserAdm , searchUserAdm};

