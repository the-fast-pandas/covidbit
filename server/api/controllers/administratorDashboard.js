// Server - CovidBit - Fast Pandas
// ADMINISTRATOR DASHBOARD
// Created: 09, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');

const getAdmDashboard = function (req, res) {
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

module.exports = { getAdmDashboard };