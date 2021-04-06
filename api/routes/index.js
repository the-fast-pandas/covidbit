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

routers.get("/covid-news", ctrlViewBus.getNews);
// Server Status
router.get("/status", function (req, res) {
  res.status(200).json({ status: "I am alive!" });
});

// Tracking Map
router.get('/tracker-map');
router.get('/tracker-map-view/:id', ctrlViewBus.getMapCardInfo);
router.post('/search-nameandLocation-adm', ctrlDashAdmin.searchBusinessNameLocationAdm);

// Small Business View
router.post('/search', ctrlViewBus.searchUserView);
router.get('/business-user-view/:id', ctrlDashUser.getUser);
router.get('/all-business', ctrlViewBus.getAllBusiness);
router.get('/all-cases', ctrlViewBus.getAllCases);
router.get('/all-safety', ctrlViewBus.getAllSafety);


////////   BUSINESS USER  ////////
//loginForm/registration
router.post('/login-form', ctrlLog.loginUser);
router.post('/registration-form', ctrlReg.registrationForm);
router.post('/check-user', ctrlReg.checkUser);
router.post('/certification-form/:id', authLog.authLogin, ctrlDashUser.addCertification);
router.post('/forgot-password', ctrlLog.forgotPassword);
router.get('/check-reset-password/:token', ctrlLog.checkResetPassword);
router.put('/new-password', ctrlLog.resetPassword);

// Small business dashoard
router.get('/business-dashboard/:id', authLog.authLogin, ctrlDashUser.getUser);
router.get('/edit-profile/:id', authLog.authLogin, ctrlDashUser.getUser);
router.put('/edit-profile/:id', authLog.authLogin, ctrlDashUser.editUser);
router.put('/add-safety/:id', authLog.authLogin, ctrlDashUser.addSafety);
router.post('/remove-safety',authLog.authLogin, ctrlDashUser.deleteSafety);

//add review
router.put('add-review/:id', ctrlViewBus.addReview);
//add case
//edit case

////////   ADMINISTRATOR  ////////
router.post('/get-user-adm', authLog.authAdmin, ctrlDashAdmin.getUserAdm);
router.post('/get-user-cases', authLog.authAdmin, ctrlDashAdmin.getUserCasesAdm);
router.post('/delete-user-adm', authLog.authAdmin, ctrlDashAdmin.deleteUserAdm);
router.post('/delete-user-cases-adm', authLog.authAdmin, ctrlDashAdmin.deleteUserCasesAdm);
router.post('/add-user-cases-adm', authLog.authAdmin, ctrlDashAdmin.addUserCasesAdm);
router.post('/invite-new-user', authLog.authAdmin, ctrlDashAdmin.inviteNewUser);





module.exports = router;