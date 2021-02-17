// Server - CovidBit - Fast Pandas
// Created: 03, February, 2021, Teresa Costa

const jwt = require("jsonwebtoken");

const authLogin = function (req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Authentication not possible" });
    const decoded = jwt.verify(token, "ilikemypandasfast");
    req.user = decoded.user;
    next();
};

module.exports = { authLogin };