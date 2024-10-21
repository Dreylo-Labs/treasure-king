const { Schema, model } = require("mongoose");

const investmentSchema = new Schema(
  {
    investmentId: {
      type: String,
      required: true,
      match: /^TK\d{7}$/,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    returnAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Investment = model("Investment", investmentSchema);

module.exports = Investment;
