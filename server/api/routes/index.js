// Server - CovidBit - Fast Pandas
// Created: 01, February, 2021, Teresa Costa

const express = require('express');
const router = express.Router();
const ctrlReg = require('../controllers/registration');
const ctrlLog = require('../controllers/login');
const ctrlDashUser = require('../controllers/businessDashboard');
const authLog = require('../middleware/auth');
const ctrlProfUser = require('../controllers/businessProfile');
const ctrlDashAdm = require('../controllers/administratorDashboard');
const ctrlViewBus = require('../controllers/businessView');


// Server Status
router.get("/status", function (req, res) {
  res.status(200).json({ status: "I am alive!" });
});

// Login/registration
router.post('/login-form', ctrlLog.loginUser);
router.post('/registration-form', ctrlReg.registerUser);

// Tracking Map
router.get('/tracker-map');

// Search

// Small Business View
router.get('/business-user-view', ctrlViewBus.getUserView);

// Small business dashoard
router.get('/business-dashboard', authLog.authLogin, ctrlDashUser.getUserDashboard);
router.get('/business-profile', authLog.authLogin, ctrlProfUser.getUserProfile);

// Administrator dashboard
router.get('/administrator-dashboard', authLog.authLogin, ctrlDashAdm.getAdmDashboard);



module.exports = router;
