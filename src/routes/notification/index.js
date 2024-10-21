const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const NotificationController = require("./notification.controller");

router.use(auth);

router.get("/", auth, NotificationController.getNotification());

module.exports = router;
