const { Schema, model, Types } = require("mongoose");

const wallethistorySchema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: [String], enum: ["Debit", "Credit", "Refferal"] },
  timestamp: { type: Date, default: Date.now },
  wallet: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const WalletHistory = model("Wallethistory", wallethistorySchema);

module.exports = WalletHistory;
