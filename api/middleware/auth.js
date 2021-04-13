// Server - CovidBit - Fast Pandas
// AUTHENTICATION middleware
// Created: 03, February, 2021, Teresa Costa

const jwt = require("jsonwebtoken");

// Controls the business user access to authenticated routes
const authLogin = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "User not authenticated!" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "No authentication token!" });
    }
}

//Controls the administrator access to authenticated routes
const authAdmin = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_ADMIN, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Administrator not authenticated!" });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "No authentication token!" });
    }
}

module.exports = { authLogin, authAdmin };