const { Schema, model } = require('mongoose');

const investmentCycleSchema = new Schema(
  {
    iteration: {
      type: Number,
      required: true,
    },
    investmentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Investment',
    },
    amount: {
      type: Number,
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    gamePlayed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
    },
  }
);

const InvestmentCycle = model('InvestmentCycle', investmentCycleSchema);

module.exports = InvestmentCycle;
