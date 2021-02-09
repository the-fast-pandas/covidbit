// Server - CovidBit - Fast Pandas
// Created: 03, February, 2021, Teresa Costa

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const saltRounds = 10;

// Responsible for registration of small business in database
const registerUser = function (req, res) {
  const { email, businessName, password } = req.body; 
  SmallBusiness.findOne({ "loginId": email }, function (error, user) {
    if (error) throw error;
    if (user) return res.status(400).json({ message: "User Already Exists" });
    if (!user) {
      newBusiness = new SmallBusiness({
        businessName,
        email,
        password
      });
      bcrypt.genSalt(saltRounds, function (error, salt) {
        if (error) throw error;
        bcrypt.hash(newBusiness.password, salt, function (error, hash) {
          if (error) throw error;
          if (!hash) return res.status(400).json({ message: "Did you enter a password?" });
          newBusiness.save(function (error) {
            if (error) throw error;
            email.sendEmail('myemail@provider.com', email.registrationInvite);
            const payload = {
              user: {
                id: newBusiness.id
              }
            };
            const token = jwt.sign(payload, "ilikemypandasfast", { expiresIn: 1000 });
            return res.status(200).json({ token });
          });
        });
      });
    };
  })
}

module.exports = { registerUser };