// Server - CovidBit - Fast Pandas
// Conects to the ADMINISTRATOR DASHBOARD/SERVICES
// Created: 28, February, 2021, Teresa Costa

const jwt = require("jsonwebtoken"); // Nodejs modules
// MongoDB Schemas
const SmallBusiness = require('../schema/smallBusiness');
const Cases = require('../schema/cases');
const Administrator = require('../schema/administrator');

///////////  AUTHENTICATION  ///////////

// Controls the login for an administrator
// Returns token and administrator information
const loginAdmin = function (req, res) {
  const { email, password } = req.body;
  Administrator.findOne({ "loginId": email }, function (error, admin) {
    if (error) {
      throw error;
    }
    if (!admin) {
      return res.status(401).json({ message: "Incorrect LoginId!" });
    }
    if (admin) {
      if (password == admin.password) {
        const payload = { admin: { id: admin.id } };
        const adminToken = jwt.sign(payload, process.env.SECRET_ADMIN, { expiresIn: '200m' });
        return res.status(200).json({ adminToken, admin });
      } else {
        return res.status(401).json({ message: "Incorrect Password!" });
      }
    }
  })
}

///////////  SETTINGS BUSINESS USER  ///////////

// Administrator can search multiple users based on business name
// Returns an array with the business name and id of businesses that match
const searchUserAdm = function (req, res) {
  const { name } = req.body;
  SmallBusiness.find({ "businessName": { $regex: name } }, function (error, users) {
    if (error) {
      throw error;
    }
    if (!users) {
      return res.status(401).json({ message: "This business user does not exist!" });
    }
    if (users) {
      let myUsers = [];
      for (let i = 0; i < Object.keys(users).length; i++) {
        let singleUser = {};
        singleUser["businessName"] = users[i].businessName;
        singleUser["_id"] = users[i]._id;
        myUsers.push(singleUser);
      }
      return res.status(200).json({ myUsers });
    }
  })
}

const searchBusinessNameLocationAdm = function (req, res) {
  const { name } = req.body;
  SmallBusiness.find({ "businessName": { $regex: name } }, function (error, users) {
    if (error) {
      throw error;
    }
    if (!users) {
      return res.status(401).json({ message: "This business user does not exist!" });
    }
    if (users) {
      let myUsers = [];
      for (let i = 0; i < Object.keys(users).length; i++) {
        let singleUser = {};
        singleUser["businessName"] = users[i].businessName;
        singleUser["location"] = users[i].location;
        singleUser["_id"] = users[i]._id;
        myUsers.push(singleUser);
      }
      return res.status(200).json({ myUsers });
    }
  })
}

// Administrator can delete a user
const deleteUserAdm = function (req, res) {
  const id = req.params.id;
  SmallBusiness.remove(id, function (error, user) {
    if (error) {
      throw error;
    }
    if (!user) {
      return res.status(401).json({ message: "This business user does not exist!" });
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
  const id = req.params.id;
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

const addCasesAdm = function (req, res) {

  newCase = new Case({
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



  newCase.save(function (error) {
    if (error) {
      throw error;
    }
    return res.status(200).json({ newCase });
  });


}

module.exports = { searchUserAdm, deleteUserAdm, searchUserCasesAdm, deleteUserCaseAdm, loginAdmin, searchBusinessNameLocationAdm, addCasesAdm };