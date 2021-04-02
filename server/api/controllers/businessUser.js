// Server - CovidBit - Fast Pandas
// BUSINESS USER DASHBOARD
// Created: 09, February, 2021, Teresa Costa

const SmallBusiness = require('../schema/smallBusiness');
const Cases = require('../schema/cases');

// Returns information for a business user associated to an id
const getUserDashboard = function (req, res) {
    SmallBusiness.findById(req.params.id, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business does not exist!" });
        }
        if (user) {
            return res.status(200).json({ user });
        }
    })
}

// Business User can edit profile
// Returns business user id
const editUserProfile = function (req, res) {
    console.log("Here")
    let id = req.params.id;
    let newvalues = {
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

const addSafety = function (req, res) {
    let id = req.params.id;
    let mySafety = [];
    SmallBusiness.findById(id, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business does not exist!" });
        }
        if (user) {
            let safety = {};
            safety["title"] = req.body.title;
            safety["description"] = req.body.description;
            mySafety = user.safetyMeasures;
            mySafety.push(safety);
            let newvalues = { $set: { safetyMeasures: mySafety } };
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
    })
}

const addCases = function (req, res) {
    let id = req.params.id;
    SmallBusiness.findById(id, function (error, user) {
        if (error) {
            throw error;
        }
        if (!user) {
            return res.status(401).json({ message: "This business does not exist!" });
        }
        if (user) {
            let businessName = req.body.businessName;
            let status = req.body.status;
            let gender = req.body.gender;
            let age = req.body.age;
            let acquisition = req.body.acquisition;
            newCase = new Cases({
                id,
                businessName,
                status,
                gender,
                age,
                acquisition
            });
            newCase.save(function (error) {
                if (error) {
                    throw error;
                }
                return res.status(200).json({ newCase });
            })
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



module.exports = { getUserDashboard, editUserProfile, addSafety, addCertification, addCases };