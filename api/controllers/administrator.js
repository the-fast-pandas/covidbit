// Server - CovidBit - Fast Pandas
// Connects to the ADMINISTRATOR DASHBOARD/SERVICES
// Created: 28, February, 2021, Teresa Costa

// MongoDB Schemas
const SmallBusiness = require('../schema/smallBusiness');
const Cases = require('../schema/cases');
const Invitation = require('../schema/invitations');
// Email Service
const emailInvitation = require('../models/emailService/emailInvitation')

///////////  SETTINGS BUSINESS USER  ///////////

// Search multiple users based on business name
// Returns an array of business users
const getUserAdm = function (req, res) {
  const { name } = req.body;
  SmallBusiness.find({ "businessName": { $regex: name } }, function (error, users) {
    if (error) {
      return res.status(404).json({ message: "Server error!" });
    }
    if (!users) {
      return res.status(401).json({ message: "This business user does not exist!" });
    }
    if (users) {
      return res.status(200).json({ users });
    }
  })
}

// Delete multiple users based on id
// Returns an array of deleted users
const deleteUserAdm = function (req, res) {
  const idList = req.body;
  SmallBusiness.deleteMany({ '_id': { '$in': idList } }, function (error, users) {
    if (error) {
      return res.status(404).json({ message: "Server error!" });
    }
    if (!users) {
      return res.status(401).json({ message: "This business user does not exist!" });
    }
    if (users) {
      return res.status(200).json(users);
    }
  })
}

// Invite a new business to register
// Returns the email used for invitation
const invitationEmailDemo = 'covidbitreg@gmail.com';
const inviteNewUser = function (req, res) {
  const { email } = req.body;
  newInvitation = new Invitation({
    email
  })
  newInvitation.save(function (error) {
    if (error) {
      return res.status(404).json({ message: "Server error!" });
    }
    // "invitationEmailDemo" must be replace with "email" for live working
    emailInvitation.emailInvitation(invitationEmailDemo, "Small Business");
    return res.status(200).json({ email });
  })
}

///////////  SETTINGS CASES  ///////////

// Search multiple cases based on business name
// Returns an array of cases
const getUserCasesAdm = function (req, res) {
  const { name } = req.body;
  Cases.find({ "businessName": { $regex: name } }, function (error, cases) {
    if (error) {
      return res.status(404).json({ message: "Server error!" });
    }
    if (!cases) {
      return res.status(401).json({ message: "This business does not have cases!" });
    }
    if (cases) {
      return res.status(200).json({ cases });
    }
  })
}

// Delete multiple cases based on id
// Returns an array of deleted cases
const deleteUserCasesAdm = function (req, res) {
  const idList = req.body;
  Cases.deleteMany({ '_id': { '$in': idList } }, function (error, cases) {
    if (error) {
      throw error;
    }
    if (!cases) {
      return res.status(401).json({ message: "This user does not have any cases!" });
    }
    if (cases) {
      return res.status(200).json(cases);
    }
  })
}

// Add a new cases for a business
// Returns data for the new case
const addUserCasesAdm = function (req, res) {
  const { businessName, status, gender, age, acquisition } = req.body;
  SmallBusiness.findOne({ "businessName": businessName }, function (error, user) {
    if (error) {
      return res.status(404).json({ message: "Server error!" });
    }
    if (!user) {
      return res.status(401).json({ message: "This business user does not exist!" });
    }
    if (user) {
      const businessId = user._id;
      newCase = new Cases({
        businessId,
        businessName,
        status,
        gender,
        age,
        acquisition
      });
      newCase.save(function (error) {
        if (error) {
          return res.status(404).json({ message: "Server error!" });
        }
        return res.status(200).json({ newCase });
      });
    }
  })
}

module.exports = { getUserAdm, deleteUserAdm, getUserCasesAdm, deleteUserCasesAdm, addUserCasesAdm, inviteNewUser };