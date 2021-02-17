// Server - CovidBit - Fast Pandas
// Created: 03, February, 2021, Teresa Costa
// Modified: 08, February, 2021, Teresa Costa: frontend integration, loginUser finished

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');

const loginUser = function (req, res) {
    const { email, password } = req.body;
    SmallBusiness.findOne({ "loginId": email }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "incorrectLoginId" });
        }
        if (user) {
            bcrypt.compare(password, user.password, function (error, result) {
                if (error) {
                    throw error;
                }
                if (!result) {
                    return res.status(401).json({ message: "incorrectPassword" });
                }
                const payload = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(
                    payload,
                    "ilikemypandasfast",
                    { expiresIn: 1000 }
                );
                return res.status(200).json({ token });
            });
        }
    })
}

module.exports = { loginUser};