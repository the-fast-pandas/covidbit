// Server - CovidBit - Fast Pandas
// AUTHENTICATION
// Created: 03, February, 2021, Teresa Costa

const jwt = require("jsonwebtoken");
const accessTokenSecret = "ilikemypandasfast";

const authLogin = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, accessTokenSecret, (error, user) => {
            console.log(user);
            if (error) {
                return res.status(401).json({ message: "Server error" });
            }
            //req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "No token provided" });
    }
}

module.exports = { authLogin };