const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth');
const AddressController = require('../address/address.controller');

const UserController = require('./user.controller');

router.post('/signup', UserController.signup());
router.post('/login', UserController.login());
router.post('/verify', UserController.verifyOtp());
router.post('/mpin', auth, UserController.mPin());
router.post('/verifypin', auth, UserController.verifyMpin());
router.post('/forgetpin', auth, UserController.forgotMpin());
router.post('/address', auth, AddressController.address());
router.get('/', auth, UserController.getUser());
router.post('/update', auth, UserController.updateUser())
router.post("/resend-otp", UserController.resendOtp());



module.exports = router;
