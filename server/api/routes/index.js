// Server - CovidBit
// Created: 31, January, 2021
// Teresa Costa - Fast Pandas

const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const ctrlAuth = require('../controllers/authentication');

// Root
=======
const ctrlReg = require('../controllers/registration');
const ctrlLog = require('../controllers/login');
const authLog = require('../middleware/auth');

// Server Status
>>>>>>> 7ffa663 (map visualization 1)
router.get("/status", function (req, res) {
  res.status(200).json({ status: "I am alive!" });
});

<<<<<<< HEAD
// Authentication process
router.post('/login-form', ctrlAuth.loginUser);
router.post('/registration-form', ctrlAuth.registerUser);
=======
// Login
router.post('/login-form', ctrlLog.loginUser);
router.get('/login-form', authLog.authLogin, ctrlLog.returnUser);

// registration
router.post('/registration-form', ctrlReg.registerUser);
>>>>>>> 7ffa663 (map visualization 1)

module.exports = router;
