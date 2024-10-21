const Notification = require('../models/notification');


class NotificationService {
    constructor() {
        this.model = Notification;
    }

    async findAllNotification() {
        const notification = await this.model.find();

        return { data: notification };
    }

    async createNotification(data) {
        const notification = await this.model.create(data);

        return notification;
    }
}

module.exports = new NotificationService();