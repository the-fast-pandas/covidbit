// Server - CovidBit - Fast Pandas
// BUSINESS VIEW
// Created: 16, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');

const getUserView = function (req, res) {
    SmallBusiness.findById(req.body.id, function (error, user) {
        console.log("I am here");
        console.log(user);
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "incorrectId" });
        }
        if (user) {
            console.log("I am here");
            console.log(user);
            return res.status(200).json({ user });
        }
    })
}

module.exports = { getUserView };