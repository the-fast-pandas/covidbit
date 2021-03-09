// Server - CovidBit - Fast Pandas
// LOGIN for small business user
// Created: 03, February, 2021, Teresa Costa

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const SmallBusiness = require('../schema/smallBusiness');
const crypto = require('crypto');
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
                const payload = { user: { id: user.id } };
                const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '200m' });
                return res.status(200).json({ accessToken, user });
            });
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
            const businessName = user.businessName;
            console.log(newvalues);
            SmallBusiness.updateOne({ "_id": user._id }, newvalues, function (error, user) {
                if (error) {
                    throw error;
                }
                if (!user) {
                    return res.status(401).json({ message: "User not found!" });
                }
                if (user) {
                    const emailSend = 'http://localhost:4200/auth/reset_password?token=' + token;
                    emailService.email( businessName, 'covidbitreg@gmail.com', emailSend, 'COVIDBIT Website Registration Request');
                    return res.status(200).json({ user });
                }
            })
        }
    })
}


const resetPassword = function (req, res, next) {
    User.findOne({
        reset_password_token: req.body.token, reset_password_expires: { $gt: Date.now() }, function(error, user) {
            if (error) {
                throw error;
            }
            if (!user) {
                return res.status(401).json({ message: "User not found!" });
            }
            if (user) {
                user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
                user.reset_password_token = undefined;
                user.reset_password_expires = undefined;
            }
        }
    });
};






module.exports = { loginUser, forgotPassword, resetPassword };