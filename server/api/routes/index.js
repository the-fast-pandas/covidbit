// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');

// Root
router.get("/status", function (req, res) {
  res.status(200).json({ status: "I am alive!" });
});

// Authentication process
router.post('/login-form', ctrlAuth.loginUser);
router.post('/registration-form', ctrlAuth.registerUser);

module.exports = router;
