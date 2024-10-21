const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message:
        "Mobile number must be a 10-digit number without any spaces or special characters.",
    },
  },
  preferralcode: { type: String, required: true, default: "TKR0000001" },
  referralcode: {
    type: String,
    required: true,
    unique: true,
    match: /^TKR\d{7}$/,
  },
  dateOfBirth: { type: String },

  otp: { type: String },
  // mpin: { type: String }, isko remove krna hh
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
