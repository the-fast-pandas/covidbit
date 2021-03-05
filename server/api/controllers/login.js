// Server - CovidBit - Fast Pandas
// LOGIN for small business user/administrator
// Created: 03, February, 2021, Teresa Costa
// Modified: 08, February, 2021, Teresa Costa: frontend integration, loginUser finished
// Modified: 23, February, 2021, Teresa Costa: added administrator support

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const Administrator = require('../schema/administrator');

const accessTokenSecret = "ilikemypandasfast";
const refreshTokens = [];

const loginUser = function (req, res) {
    const { email, password } = req.body;
    SmallBusiness.findOne({ "loginId": email }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            Administrator.findOne({ "loginId": email }, function (error, adm) {
                if (error) {
                    throw error;
                }
                if (!adm) {
                    return res.status(401).json({ message: "incorrectLoginId" });
                }
                if (adm) {
                    bcrypt.compare(password, adm.password, function (error, result) {
                        if (error) {
                            throw error;
                        }
                        if (!result) {
                            return res.status(401).json({ message: "incorrectPassword" });
                        }
                        const payload = {
                            adm: {
                                id: adm.id
                            }
                        };
                        const token = jwt.sign(
                            payload,
                            "ilikemypandasfast",
                            { expiresIn: 1000 }
                        );
                        return res.status(200).json({ token });
                    })
                }

            })

        }
        if (user) {
            bcrypt.compare(password, user.password, function (error, result) {
                if (error) {
                    throw error;
                }
                if (!result) {
                    return res.status(401).json({ message: "incorrectPassword" });
                }
                const payload = { user: { id: user.id } };
                const accessToken = jwt.sign( payload, accessTokenSecret,  { expiresIn: '20m' });
                const refreshToken = jwt.sign( payload, accessTokenSecret);
                refreshTokens.push(refreshToken);
                return res.status(200).json({ accessToken, user });
            });
        }
    })
}

module.exports = { loginUser };