// Server - CovidBit - Fast Pandas
// Controls the BUSINESS VIEW
// Created: 16, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');

// Search for a business using business name
const searchUserView = function (req, res) {
    const { name } = req.body;
    SmallBusiness.findOne({ "businessName": name }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business does not exist!"  });
        }
        if (user) {
            id = user.id;
            return res.status(200).json({ id });
        }
    })
}

// Gets data for the business view using business id
const getUserView = function (req, res) {
    SmallBusiness.findById(req.params.id, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business does not exist!" });
        }
        if (user) {
            return res.status(200).json({ user });
        }
    })
}

module.exports = { getUserView, searchUserView};