// Server - CovidBit - Fast Pandas
// Connects to external APIs
// Created: 03, April, 2021, Teresa Costa

const request = require("request");

// Accepts an address
// Returns geolocation data
const googleMaps = function (req, res, next) {
    const { address } = req.body;
    let url = process.env.GOOGLE_BASE + address + "&key=" + process.env.GOOGLE_KEY;

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(200).json(response);
        }
        else {
            return res.status(401).json({ message: "Google Service is unavailable!" });
        }
    });
};

// Returns a list of news headlines for the parameters: health, canada
const news = function (req, res, next) {
    var url = process.env.NEWS;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(200).json(response);
        }
        else {
            return res.status(401).json({ message: "News is unavailable!" });
        }
    });
}

module.exports = { googleMaps, news };
