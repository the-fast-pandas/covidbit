// Server - CovidBit - Fast Pandas
// Controls the BUSINESS VIEW
// Created: 16, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');

// Search for one business using business name
// Returns the business user id
const searchUserView = function (req, res) {
    const { name } = req.body;
    SmallBusiness.findOne({ "businessName": name }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business user does not exist!" });
        }
        if (user) {
            id = user.id;
            return res.status(200).json({ id });
        }
    })
}

const getAll = function (req, res) {
    SmallBusiness.find({}, function (error, users) {
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
                singleUser["businessType"] = users[i].businessType;
                singleUser["id"] = users[i]._id;
                myUsers.push(singleUser);
            }
            return res.status(200).json({ myUsers });
        }
    })
}

// Returns data for the business view using business id
const getUserView = function (req, res) {
    SmallBusiness.findById(req.params.id, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business user does not exist!" });
        }
        if (user) {
            return res.status(200).json({ user });
        }
    })
}

module.exports = { getUserView, searchUserView, getAll };