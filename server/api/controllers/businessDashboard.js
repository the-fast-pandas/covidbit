// Server - CovidBit - Fast Pandas
// BUSINESS USER DASHBOARD
// Created: 09, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');

const getUserDashboard = function (req, res) {
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

module.exports = { getUserDashboard };