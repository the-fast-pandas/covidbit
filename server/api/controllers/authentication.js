// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

const email = require('../models/email');
const Administrator = require('../schema/user');
const SmallBusiness = require('../schema/smallBusiness');


// Responsible for login query to database
// Security needs to be implemented
// It only allows login for administrator
// Considering that validation is done on frontend
const loginUser = function (req, res) {
  const { loginId, password } = req.query;  // Checks parameters from the request
  Administrator.findOne({ "loginId": loginId }, function (error, user) {
    if (error) throw error;
    else if (password == user.password) {
      console.log(user);
      if (user) {
        res.status(200).json({ status: "I am here!" });
      } else {
        res.status(200).json({ status: "Nobody here!" });
      }
    }
  });
}

// Responsible for registration of user in database
// Security and validation needs to be implemented
const registerUser = function (req, res) {
  //const user = req.body.name;
  const business = new SmallBusiness({ businessName: 'Pizza Pizza', loginId: 'myemail@provider.com', password: 'fake' });
  business.save(
    function (error) {
      if (error) throw error;
      else res.status(200).json({ status: "Small Business added!" });
      email.sendEmail('myemail@provider.com', email.registrationInvite);
    });
}

module.exports = { loginUser, registerUser };