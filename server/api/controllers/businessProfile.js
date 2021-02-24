// Server - CovidBit - Fast Pandas
// BUSINESS PROFILE
// Created: 16, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');

const getUserProfile = function (req, res) {
    SmallBusiness.findById(req.body.id, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(200).json({ user });
        }
        if (user) {
            return res.status(200).json({ user });
        }
    })
}

module.exports = { getUserProfile};