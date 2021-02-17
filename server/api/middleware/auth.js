// Server - CovidBit - Fast Pandas
// Created: 03, February, 2021, Teresa Costa

const jwt = require("jsonwebtoken");

const authLogin = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "ilikemypandasfast");
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};

module.exports = { authLogin };