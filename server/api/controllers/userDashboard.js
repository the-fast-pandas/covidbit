// Server - CovidBit - Fast Pandas
// Created: 09, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');

const getUserDashboard = function (req, res) {
    SmallBusiness.findById(req.params.id, (error, data) => {
        if (error) {
            throw error;
        }
        else {
            res.status(200).json({ message: data })
        }
    })
}

module.exports = { getUserDashboard };