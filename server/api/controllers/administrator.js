// Server - CovidBit - Fast Pandas
// Conects to the ADMINISTRATOR DASHBOARD/SERVICES
// Created: 28, February, 2021, Teresa Costa

// Nodejs modules
const jwt = require("jsonwebtoken");
// MongoDB Schemas
const SmallBusiness = require('../schema/smallBusiness');
const Cases = require('../schema/cases');
const Administrator = require('../schema/administrator');


///////////  AUTHENTICATION  ///////////

// Controls the login for an administrator
const loginAdmin = function (req, res) {
  const { email, password } = req.body;
  Administrator.findOne({ "loginId": email }, function (error, user) {
    if (error) {
      throw error;
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect LoginId!" });
    }
    if (user) {
      if (password == user.password) {
        const payload = { user: { id: user.id } };
        const adminToken = jwt.sign(payload, process.env.SECRET_ADMIN, { expiresIn: '20m' });
        return res.status(200).json({ adminToken, user });
      } else {
        return res.status(401).json({ message: "Incorrect Password!" });
      }
    }
  })
}

///////////  SETTINGS BUSINESS USER  ///////////

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

///////////  SETTINGS CASES  ///////////

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



// Administrator can delete a case
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

module.exports = {  searchUserAdm, deleteUserAdm, searchUserCasesAdm, deleteUserCaseAdm, loginAdmin };