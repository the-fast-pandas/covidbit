// Server - CovidBit - Fast Pandas
// Created: 28, February, 2021, Teresa Costa

const mongoose = require("mongoose");

const CasesSchema = mongoose.Schema({
    businessId: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Unknown'
    },
    gender: {
        type: String,
        default: 'Unknown'
    },
    age: {
        type: Number,
        default: -1
    },
    acquisition: {
        type: String,
        default: 'Unknown'
    }
});

module.exports = mongoose.model("cases", CasesSchema, 'Cases');