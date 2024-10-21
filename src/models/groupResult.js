const { Schema, model } = require('mongoose');

const groupResultSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    investmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Investment',
      required: true,
    },
    investmentCycleId: {
      type: Schema.Types.ObjectId,
      ref: 'InvestmentCycle',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      refwuired: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const GroupResult = model('GroupResult', groupResultSchema);

module.exports = GroupResult;
