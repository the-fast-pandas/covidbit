// Server - CovidBit - Fast Pandas
// AUTHENTICATION
// Created: 03, February, 2021, Teresa Costa

const jwt = require("jsonwebtoken");

const authLogin = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'ilikemypandasfast', (error, user) => {
            if (error) {
                return res.status(401).json({ message: "User not authenticated!"});
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "No authentication token!" });
    }
}

module.exports = { authLogin };