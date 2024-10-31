const router = require('express').Router();
const { adminAuth } = require('../../middleware/auth');
const AdminController = require('./admin.controller');

router.post('/login', AdminController.login());
router.post('/signup', AdminController.signup());
router.post('/blocked', adminAuth, AdminController.blockedUser());

module.exports = router;
