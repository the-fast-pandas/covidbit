// Server - CovidBit - Fast Pandas
// Connects to the BUSINESS VIEW
// Created: 16, February, 2021, Teresa Costa

// MongoDB Schemas
const SmallBusiness = require('../schema/smallBusiness');
const Cases = require('../schema/cases');
const SafetyMeasures = require('../schema/safetyMeasures');


// Search for one business using business name
// Returns the business user id
const searchUserView = function (req, res) {
    const { name } = req.body;
    SmallBusiness.findOne({ "businessName": name }, function (error, user) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        if (!user) {
            return res.status(401).json({ message: "This business user does not exist!" });
        }
        if (user) {
            id = user.id;
            return res.status(200).json({ id });
        }
    })
}

// Retuns all Business Users in database
const getAllBusiness = function (req, res) {
    SmallBusiness.find({}, function (error, users) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        if (!users) {
            return res.status(401).json({ message: "There is no business users in database!" });
        }
        if (users) {
            return res.status(200).json({ users });
        }
    })
}

// Returns all the covid cases in database
const getAllCases = function (req, res) {
    Cases.find({}, function (error, cases) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        if (!cases) {
            return res.status(401).json({ message: "There is no cases in database!" });
        }
        if (cases) {
            return res.status(200).json({ cases });
        }
    })
}

// Returns all the safety measures in database
const getAllSafety = function (req, res) {
    SafetyMeasures.find({}, function (error, safeties) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        if (!safeties) {
            return res.status(401).json({ message: "There is no cases in database!" });
        }
        if (safeties) {
            return res.status(200).json({ safeties });
        }
    })
}

// Adds a review associated with a business id
const addReview = function (req, res) {
    let id = req.params.id;
    let myReview = [];
    SmallBusiness.findById(id, function (error, user) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        if (!user) {
            return res.status(401).json({ message: "This business does not exist!" });
        }
        if (user) {
            let review = {};
            review["username"] = req.body.username;
            review["comment"] = req.body.comment;
            myReview = user.reviews;
            myReview.push(review);
            let newvalues = { $set: { reviews: myReview } };
            SmallBusiness.updateOne({ "_id": id }, newvalues, function (error, user) {
                if (error) {
                    return res.status(404).json({ message: "Server error!" });
                }
                if (!user) {
                    return res.status(401).json({ message: "This business does not exist!" });
                }
                if (user) {
                    return res.status(200).json({ id });
                }
            })
        }
    })
}

module.exports = { searchUserView, getAllBusiness, getAllCases, addReview, getAllSafety };