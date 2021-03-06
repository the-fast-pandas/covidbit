// Server - CovidBit - Fast Pandas
// LOGIN for small business user
// Created: 03, February, 2021, Teresa Costa
// Modified: 08, February, 2021, Teresa Costa: frontend integration, loginUser finished

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const Administrator = require('../schema/administrator');

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
                const accessToken = jwt.sign(payload, 'ilikemypandasfast', { expiresIn: '20m' });
                return res.status(200).json({ accessToken, user });
            });
        }
    })
}

module.exports = { loginUser };