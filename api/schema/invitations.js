// Server - CovidBit - Fast Pandas
// Schema for Invitations - MongoDB
// Created: 08, February, 2021, Teresa Costa

const mongoose = require("mongoose");

const InvitationsSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('invitations', InvitationsSchema, 'Invitations');