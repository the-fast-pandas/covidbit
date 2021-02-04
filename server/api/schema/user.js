const mongoose = require("mongoose");

const AdministratorSchema = mongoose.Schema({
  loginId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("administrator", AdministratorSchema, 'Administrator');