const router = require('express').Router();
const AdminController = require('./admin.controller');

router.post('/login', AdminController.login());
router.post('/signup', AdminController.signup());

module.exports = router;
