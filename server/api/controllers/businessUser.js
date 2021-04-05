// Server - CovidBit - Fast Pandas
// BUSINESS USER DASHBOARD
// Created: 09, February, 2021, Teresa Costa

// MongoDB Schemas
const SmallBusiness = require('../schema/smallBusiness');
const Cases = require('../schema/cases');
const SafetyMeasures = require('../schema/safetyMeasures');

// Gets a business user by id
// Returns information for the business user
const getUser = function (req, res) {
    SmallBusiness.findById(req.params.id, function (error, user) {
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

// Edits a business user profile by id
// Returns the user id
const editUser = function (req, res) {
    const id = req.params.id;
    const newvalues = {
        $set: {
            businessName: req.body.businessName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            location: req.body.businessLocation,
            phoneNumber: req.body.businessPhone,
            businessType: req.body.businessType,
            email: req.body.email,
            website: req.body.webSite,
        }
    };
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

// Adds a safety measure by business id
// Returns the new safety meausre
const addSafety = function (req, res) {
    const { title, description } = req.body;
    SmallBusiness.findById(req.params.id, function (error, user) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        if (!user) {
            return res.status(401).json({ message: "This business user does not exist!" });
        }
        if (user) {
            const businessId = user._id;

            newSafety = new SafetyMeasures({
                businessId,
                title,
                description
            });
            newSafety.save(function (error) {
                if (error) {
                    return res.status(404).json({ message: "Server error!" });
                }
                return res.status(200).json({ newSafety });
            });
        }
    })
}

// Administrator can delete multiple users based on id
// Returns an array of deleted users
const deleteSafety = function (req, res) {
    const idList = req.body;
    SafetyMeasures.deleteMany({ '_id': { '$in': idList } }, function (error, safeties) {
        if (error) {
            return res.status(404).json({ message: "Server error!" });
        }
        if (!safeties) {
            return res.status(401).json({ message: "This safety measure does not exist!" });
        }
        if (safeties) {
            return res.status(200).json(safeties);
        }
    })
}

//method to submit
const addCertification = function (req, res) {
    let id = req.params.id;
    let newvalues = {
        $set: {
            certification: true
        }
    };
    SmallBusiness.updateOne({ "_id": id }, newvalues, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business does not exist!" });
        }
        if (user) {
            return res.status(200).json({ id });
        }
    })
}



module.exports = { getUser, editUser, addSafety, addCertification, deleteSafety };