// Server - CovidBit - Fast Pandas
// Created: 03, February, 2021, Teresa Costa
// Modified: 08, February, 2021, Teresa Costa: frontend integration, registerUser changed to match schema

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const emailService = require('../models/email');
const saltRounds = 10;

const registerUser = function (req, res) {
  const { accountDetails, businessDetails, safteyMeasures } = req.body;
  const password = accountDetails.password;
  const loginId = accountDetails.email;
  const businessName = accountDetails.businessName;

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
        businessName
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
              emailService.sendEmail('myemail@provider.com', emailService.registrationInvite);
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

module.exports = { registerUser };