// Server - CovidBit - Fast Pandas
// Connects to the login form
// Created: 03, February, 2021, Teresa Costa

// Security/authentication
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// MongoDb shemas
const SmallBusiness = require('../schema/smallBusiness');
const emailService = require('../models/emailService/emailForgotPassword');
const Administrator = require('../schema/administrator');

// Controls the loginForm for a business user and administrator
// Accepts credentials and returns an authentication token
const loginUser = function (req, res) {
    const { email, password } = req.body;
    if (email === "admin@myAdmin.ca") {
        Administrator.findOne({ "loginId": email }, function (error, admin) {
            if (error) {
                return res.status(404).json({ message: "Server error!" });
            }
            if (!admin) {
                return res.status(401).json({ message: "Incorrect LoginId!" });
            }
            if (admin) {
                if (password == admin.password) {
                    const payload = { "id": admin.id };
                    const adminToken = jwt.sign(payload, process.env.SECRET_ADMIN, { noTimestamp: true, expiresIn: '200m' });
                    return res.status(200).json({ adminToken, admin });
                }
                return res.status(401).json({ message: "Incorrect Password!" });

            }
        })
    } else {
        SmallBusiness.findOne({ "loginId": email }, function (error, user) {
            if (error) {
                return res.status(404).json({ message: "Server error!" });
            }
            if (!user) {
                return res.status(401).json({ message: "Incorrect LoginId!" });
            }
            if (user) {
                bcrypt.compare(password, user.password, function (error, result) {
                    if (error) {
                        return res.status(404).json({ message: "Server error!" });
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
}

// Accepts a registered loginId for password reset
// Returns an access token and an email link for access
const resetEmailDemo = 'covidbitreg@gmail.com';
const forgotPassword = function (req, res) {
    SmallBusiness.findOne({ "loginId": req.body.email }, function (error, user) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
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
                    return res.status(404).json({ message: "Server error!" });
                }
                if (!user) {
                    return res.status(401).json({ message: "User not found!" });
                }
                if (user) {
                    const businessName = user.businessName;
                    const userToken = 'https://covidbit.netlify.app/reset-password/' + token;
                    // "resetEmailDemo" must be replace with "req.body.email" for live working
                    emailService.emailChangePassword(resetEmailDemo, userToken, businessName);
                    return res.status(200).json({ user });
                }
            })
        }
    })
}

// Checks if the token for password reset is valid
const checkResetPassword = function (req, res, next) {
    let token = req.params.token;
    SmallBusiness.findOne({ resetPassword: token }, function (error, user) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
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

// Resets user password
const resetPassword = function (req, res, next) {
    let password = req.body.password;
    let token = req.body.token;
    bcrypt.genSalt(saltRounds, function (error, salt) {  //sets password with hash
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        bcrypt.hash(password, salt, function (error, hash) {
            if (error) {
                return res.status(404).json({ message: "Server error!" });
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
                        return res.status(404).json({ message: "Server error!" });
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