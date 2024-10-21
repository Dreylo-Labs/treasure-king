const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true }, 
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
