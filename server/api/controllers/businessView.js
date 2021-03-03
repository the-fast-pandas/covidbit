// Server - CovidBit - Fast Pandas
// BUSINESS VIEW
// Created: 16, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');


const searchUserView = function (req, res) {
    const { name } = req.body;
    SmallBusiness.findOne({ "businessName": name }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "No user in database" });
        }
        if (user) {
            id=user.id;
            return res.status(200).json({ id });
        }
    })
}

const getUserView = function (req, res) {
    SmallBusiness.findById(req.params.id, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "No user in database" });
        }
        if (user) {
            return res.status(200).json({ user });
        }
    })
}

module.exports = { getUserView, searchUserView };