// Server - CovidBit - Fast Pandas
// Created: 01, February, 2021, Teresa Costa

const express = require('express');
const router = express.Router();
const ctrlReg = require('../controllers/registration');
const ctrlLog = require('../controllers/login');
const ctrlDashUser = require('../controllers/businessUser');
const authLog = require('../middleware/auth');
const ctrlDashAdmin = require('../controllers/administrator');
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
router.post('/certification-form/:id', authLog.authLogin, ctrlDashUser.addCertification);
// Small business dashoard
router.get('/business-dashboard/:id', authLog.authLogin, ctrlDashUser.getUserDashboard);
router.get('/edit-profile/:id', authLog.authLogin, ctrlDashUser.getUserDashboard);
router.put('/edit-profile/:id', authLog.authLogin, ctrlDashUser.editUserProfile);
router.put('/add-safety/:id', authLog.authLogin, ctrlDashUser.addSafety);

////////   ADMINISTRATOR  ////////

// Administrator login
router.post('/login-admin', ctrlDashAdmin.loginAdmin);
// Administrator Dashboard
router.post('/search-users-adm', ctrlDashAdmin.searchUserAdm);
router.delete('/delete-business-user/:id', ctrlDashAdmin.deleteUserAdm); 
router.post('/search-cases-adm', ctrlDashAdmin.searchUserCasesAdm);
router.delete('/cases-user-adm/:id', ctrlDashAdmin. deleteUserCaseAdm); 


module.exports = router;