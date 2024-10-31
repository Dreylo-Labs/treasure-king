const Notification = require("../models/notification");
const User = require('../models/user');

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

  async sendNotification(userId, message) {
    if (userId) {
      return await this.createNotification({ userId, message });
    } else {
      const users = await User.find();
      const notifications = await Promise.all(
        users.map((user) => this.createNotification({ userId: user._id, message }))
      );
      return notifications;
    }
  }
}

module.exports = new NotificationService();
