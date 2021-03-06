// Server - CovidBit - Fast Pandas
// Conects to the ADMINISTRATOR DASHBOARD
// Created: 28, February, 2021, Teresa Costa

const email = require('../templates/resgistrationAdm');

const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const Cases = require('../schema/cases');

const emailService = require('../models/email');
const saltRounds = 10;


// Administrator can register a user
const registerUserAdm = function (req, res) {

  const { email, businessName, businessType, businessPhone, businessLocation, website } = req.body;

  const loginId = email;
  const phoneNumber = businessPhone;
  const location = businessLocation;

  const password = 'fakefake';
  const firstName = 'First';
  const lastName = 'Second';
  const safetyM = [];

  SmallBusiness.findOne({ "loginId": loginId }, function (error, user) { // checks if user already exists
    if (error) {
      throw error;
    }
    if (user) {
      return res.status(401).json({ message: "This Business already exists!" });
    }
    if (!user) {
      newBusiness = new SmallBusiness({ //creates user following mongo schema
        loginId,
        password,
        businessName,
        firstName,
        lastName,
        businessType,
        phoneNumber,
        location,
        safetyM,
        website
      });
      bcrypt.genSalt(saltRounds, function (error, salt) {  // creates password
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
              emailService.email(newBusiness.businessName, 'covidbitreg@gmail.com', email.confirmRegistrationAdm, 'COVIDBIT Website Registration Request');
              const payload = { user: { id: newBusiness.id } };
              const token = jwt.sign(payload, 'ilikemypandasfast', { expiresIn: 1000 });
              return res.status(200).json({ token });
            });
          }
        });
      });
    };
  })
}

// Administrator can search a user based on business name
const searchUserAdm = function (req, res) {
  const { name } = req.body;
  SmallBusiness.find({ "businessName": { $regex: name } }, function (error, users) {
    if (error) {
      throw error;
    }
    if (!users) {
      return res.status(401).json({ message: "This business does not exist!" });
    }
    if (users) {
      return res.status(200).json({ users });
    }
  })
}

// Administrator can search for cases by business
const searchUserCasesAdm = function (req, res) {
  const { name } = req.body;
  Cases.find({ "businessName": { $regex: name } }, function (error, cases) {
    if (error) {
      throw error;
    }
    if (!cases) {
      return res.status(401).json({ message: "This business does not have cases!" });
    }
    if (cases) {
      return res.status(200).json({ cases });
    }
  })
}

// Administrator can delete a user
const deleteUserAdm = function (req, res) {
  const { id } = req.params.id;
  SmallBusiness.remove(id, function (error, user) {
    if (error) {
      throw error;
    }
    if (!user) {
      return res.status(401).json({ message: "Business User not found" });
    }
    if (user) {
      return res.status(200).json({ users });
    }
  })
}

// Administrator can delete a user
const deleteUserCaseAdm = function (req, res) {
  const { id } = req.params.id;
  Cases.remove(id, function (error, cases) {
    if (error) {
      throw error;
    }
    if (!cases) {
      return res.status(401).json({ message: "Business User not found" });
    }
    if (cases) {
      return res.status(200).json({ cases });
    }
  })
}




module.exports = { registerUserAdm, searchUserAdm, deleteUserAdm, searchUserCasesAdm, deleteUserCaseAdm };