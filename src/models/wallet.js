const { Schema, model } = require("mongoose");

const walletSchema = new Schema({
  amount: { type: Number, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
});

const Wallet = model("Wallet", walletSchema);

module.exports = Wallet;
