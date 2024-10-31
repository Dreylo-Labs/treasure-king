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
        message: 'Notification',
      };
    });
  }

  sendNotification() {
    return this.asyncWrapper(async (req) => {
      const { userId, message } = req.body;

      if (!message) {
        const error = new Error('Message is required');
        error.statusCode = 400;
        throw error;
      }

      const notification = await this.service.sendNotification(userId || null, message);

      return {
        data: notification,
        message: 'Notification sent successfully',
      };
    });
  }
}
module.exports = new NotificationController();
