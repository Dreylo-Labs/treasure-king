const Notification = require("../models/notification");

class NotificationService {
  constructor() {
    this.model = Notification;
  }

  async createNotification(data) {
    const notification = await this.model.create(data);

    return notification;
  }

  async getNotification(userId) {
    const notifications = await this.model.find({ userId });
    return notifications;
  }
}

module.exports = new NotificationService();
