// Server - CovidBit - Fast Pandas
// Created: 01, February, 2021, Teresa Costa

const express = require('express');
const router = express.Router();
const ctrlReg = require('../controllers/registration');
const ctrlLog = require('../controllers/login');
const ctrlDashUser = require('../controllers/businessUser');
const authLog = require('../middleware/auth');
const ctrlDashAdm = require('../controllers/administrator');
const ctrlViewBus = require('../controllers/businessView');


// Server Status
router.get("/status", function (req, res) {
  res.status(200).json({ status: "I am alive!" });
});

// Tracking Map
router.get('/tracker-map');
// Small Business View
router.post('/search', ctrlViewBus.searchUserView);
router.get('/business-user-view/:id', ctrlViewBus.getUserView);

////////   BUSINESS USER  ////////

// Login/registration
router.post('/login-form', ctrlLog.loginUser);
router.post('/registration-form', ctrlReg.registerUser);
router.post('/check-user', ctrlReg.checkUser);
// Small business dashoard
router.get('/business-dashboard/:id', authLog.authLogin, ctrlDashUser.getUserDashboard);
router.get('/edit-profile/:id', authLog.authLogin, ctrlDashUser.getUserDashboard);
router.get('/edit-profile', authLog.authLogin, ctrlDashUser.editUserProfile);


////////   ADMINISTRATOR  ////////

// Administrator login
router.post('/login-admin', ctrlDashAdm.loginAdmin);
// Administrator Dashboard
router.post('/search-user-adm', ctrlDashAdm.searchUserAdm);
router.post('/search-cases-adm', ctrlDashAdm.searchUserCasesAdm);
router.delete('/business-user-adm/:id', ctrlDashAdm.deleteUserAdm); 
router.delete('/cases-user-adm/:id', ctrlDashAdm. deleteUserCaseAdm); 


module.exports = router;