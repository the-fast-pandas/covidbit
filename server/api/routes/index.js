// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

const express = require('express');
const router = express.Router();
const ctrlReg = require('../controllers/registration');
const ctrlLog = require('../controllers/login');
const authLog = require('../middleware/auth');

// Server Status
router.get("/status", function (req, res) {
  res.status(200).json({ status: "I am alive!" });
});

// Login
router.post('/login-form', ctrlLog.loginUser);
router.get('/login-form', authLog.authLogin, ctrlLog.returnUser);

// registration
router.post('/registration-form', ctrlReg.registerUser);

module.exports = router;
