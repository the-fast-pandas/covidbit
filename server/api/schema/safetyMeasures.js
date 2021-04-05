// Server - CovidBit - Fast Pandas
// Created: 08, February, 2021, Teresa Costa

const mongoose = require("mongoose");

const SafetySchema = mongoose.Schema({
    businessId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    confirmed: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('safety', SafetySchema, 'Safety');