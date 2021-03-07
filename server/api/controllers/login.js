// Server - CovidBit - Fast Pandas
// LOGIN for small business user
// Created: 03, February, 2021, Teresa Costa
// https://www.codementor.io/@olatundegaruba/password-reset-using-jwt-ag2pmlck0

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');

// Controls the login for a business user
const loginUser = function (req, res) {
    const { email, password } = req.body;
    SmallBusiness.findOne({ "loginId": email }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "Incorrect LoginId!" });
        }
        if (user) {
            bcrypt.compare(password, user.password, function (error, result) {
                if (error) {
                    throw error;
                }
                if (!result) {
                    return res.status(401).json({ message: "Incorrect Password!" });
                }
                const payload = { user: { id: user.id } };
                const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '200m' });
                return res.status(200).json({ accessToken, user });
            });
        }
    })
}

module.exports = { loginUser };