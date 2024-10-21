const router = require('express').Router();
const AdminController = require('./admin.controller');
const { adminAuth } = require('../../middleware/auth');

router.post('/login', adminAuth, AdminController.login());
router.get('/group/:groupId/users', adminAuth, AdminController.getUsersForNextGroupResult());

module.exports = router;
