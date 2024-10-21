const NotificationService = require("../../services/notification.service.js");
const BaseController = require("../base.controller.js");

class NotificationController extends BaseController {
  constructor() {
    super();
    this.service = NotificationService;
  }
  getNotification() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;

      const notification = await this.service.getNotification(userId);

      return {
        data: notification,
        message: "Notification",
      };
    });
  }
}
module.exports = new NotificationController();
