// Server - CovidBit - Fast Pandas
// LOGIN for small business user
// Created: 03, February, 2021, Teresa Costa

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// MongoDb shemas
const SmallBusiness = require('../schema/smallBusiness');
const emailService = require('../models/email');

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
                if (result) {
                    const payload = { "id": user.id };
                    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { noTimestamp: true, expiresIn: '1h' });
                    return res.status(200).json({ accessToken, user });
                }
            })
        }
    })
}

const forgotPassword = function (req, res) {
    SmallBusiness.findOne({ "loginId": req.body.email }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }
        if (user) {
            let token = crypto.randomBytes(64).toString('hex');
            let newvalues = {
                $set: {
                    resetPassword: token,
                    resetPasswordExpires: Date.now() + 86400000
                }
            }
            SmallBusiness.updateOne({ "_id": user._id }, newvalues, function (error, user) {
                if (error) {
                    throw error;
                }
                if (!user) {
                    return res.status(401).json({ message: "User not found!" });
                }
                if (user) {
                    const emailSend = 'http://localhost:4200/reset-password/' + token;
                    emailService.email(user.businessName, 'covidbitreg@gmail.com', emailSend, 'COVIDBIT Website Registration Request');
                    return res.status(200).json({ user });
                }
            })
        }
    })
}


const checkResetPassword = function (req, res, next) {
    let token = req.params.token;
    SmallBusiness.findOne({ resetPassword: token }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This link is invalid." });
        }
        if (user) {
            if (user) {
                id = user.id;
                return res.status(200).json({ id });
            }
        }
    })
};


const resetPassword = function (req, res, next) {
    let password = req.body.password;
    let token = req.body.token;
    bcrypt.genSalt(saltRounds, function (error, salt) {  //sets password with hash
        if (error) {
            throw error;
        }
        bcrypt.hash(password, salt, function (error, hash) {
            if (error) {
                throw error;
            }
            if (hash) {
                let newvalues = {
                    $set: {
                        password: hash,
                        resetPassword: "",
                    }
                };
                SmallBusiness.updateOne({ resetPassword: token }, newvalues, function (error, user) {
                    if (error) {
                        throw error;
                    }
                    if (!user) {
                        return res.status(401).json({ message: "This business does not exist!" });
                    }
                    if (user) {
                        return res.status(200).json({ user });
                    }
                })


            }
        })
    })
}



module.exports = { loginUser, forgotPassword, resetPassword, checkResetPassword };