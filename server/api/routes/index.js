// Server - CovidBit - Fast Pandas
// Created: 01, February, 2021, Teresa Costa

const express = require('express');
const router = express.Router();
const ctrlReg = require('../controllers/registration');
const ctrlLog = require('../controllers/login');
const ctrlDashUser = require('../controllers/userDashboard');
const authLog = require('../middleware/auth');

// Server Status
router.get("/status", function (req, res) {
  res.status(200).json({ status: "I am alive!" });
});

// Login
router.post('/login-form', ctrlLog.loginUser);

// registration
router.post('/registration-form', ctrlReg.registerUser);

// User dashoard
router.get('/user-dashboard/id', authLog.authLogin, ctrlDashUser.getUserDashboard);

module.exports = router;
