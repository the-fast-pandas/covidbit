<<<<<<< HEAD
// Server - CovidBit
// Created: 01, February, 2021
// Teresa Costa - Fast Pandas

=======
>>>>>>> 7ffa663 (map visualization 1)
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

<<<<<<< HEAD
module.exports = mongoose.model('administrator', AdministratorSchema, 'Administrator');
=======
module.exports = mongoose.model("administrator", AdministratorSchema, 'Administrator');
>>>>>>> 7ffa663 (map visualization 1)
