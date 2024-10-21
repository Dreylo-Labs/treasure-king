const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
      unique: true,
      match: /^GC\d{5}$/,
    },
    isFreezed: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    maxInvestments: {
      type: Number,
      default: 2,
    },
    totalInvestments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Group = model('Group', groupSchema);

module.exports = Group;
