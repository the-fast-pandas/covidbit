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

const forgotPassword = function (req, res) {
    SmallBusiness.findOne({ "loginId": email }, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }
        if (user) {

            let token;
            crypto.randomBytes(20, function (err, buffer) {
                token = buffer.toString('hex');
            });
            SmallBusiness.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true })
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