// Server - CovidBit - Fast Pandas
// Created: 16, February, 2021, Teresa Costa

const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("category", CategorySchema, 'Category');