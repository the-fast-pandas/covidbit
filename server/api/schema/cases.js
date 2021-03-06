// Server - CovidBit - Fast Pandas
// Created: 28, February, 2021, Teresa Costa

const mongoose = require("mongoose");

const CasesSchema = mongoose.Schema({
    businessName: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Unknown'
    },
    gender:{
        type: String,
        default: 'Unknown'
    },
    age:{
        type: Number,
        default: -1
    },
    acquisition:{
        type: String,
        default: 'Unknown'
    },
    registered:{
        type: String,
        default: 'admin'
    }
});

module.exports = mongoose.model("cases", CasesSchema, 'Cases');