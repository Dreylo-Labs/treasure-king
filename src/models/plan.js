const { Schema, model } = require('mongoose');

const planSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    returnAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Plan = model('Plan', planSchema);

module.exports = Plan;
