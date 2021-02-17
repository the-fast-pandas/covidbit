// Server - CovidBit - Fast Pandas
// Created: 03, February, 2021, Teresa Costa
// Modified: 08, February, 2021, Teresa Costa: frontend integration, loginUser finished

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');

const loginUser = function (req, res) {
    const { email, password } = req.body;
    let message = "";
    SmallBusiness.findOne({ "loginId": email }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            message = "incorrectLoginId";
            return res.status(401).json({ message });
        }
        if (user) {
            bcrypt.compare(password, user.password, function (error, result) {
                if (error) {
                    throw error;
                }
                if (!result) {
                    message = "incorrectPassword";
                    return res.status(401).json({ message });
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

const returnUser = function (req, res) {
    SmallBusiness.findById(req.user.id, function (error, smallBusiness) {
        if (error) throw error;
        return res.status(200).json({ smallBusiness })
    });
}

module.exports = { loginUser, returnUser };