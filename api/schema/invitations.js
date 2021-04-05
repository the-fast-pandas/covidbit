// Server - CovidBit - Fast Pandas
// Created: 08, MArch, 2021, Teresa Costa

const mongoose = require("mongoose");

const InvitationsSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('invitations', InvitationsSchema, 'Invitations');