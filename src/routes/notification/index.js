const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const { adminAuth } = require('../../middleware/auth');
const NotificationController = require('./notification.controller');

// router.use(auth);

router.get('/', auth, NotificationController.getNotification());
router.post('/', adminAuth, NotificationController.sendNotification());

module.exports = router;
