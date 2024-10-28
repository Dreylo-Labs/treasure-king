const Investment = require("../models/investment");
const GroupService = require("./group.service");
const { generateRandomNumber } = require("../utils/common");
const Wallet = require("../models/wallet");

class InvestmentService {
  constructor() {
    this.model = Investment;
    this.groupService = GroupService;
  }

  async createInvestment(userId, planId) {
    const investmentId = `TK${generateRandomNumber(7)}`;
    await this.model.findOneAndUpdate({ userId: userId }, { $set: { isActive: false } });
    const investment = await this.model.create({
      userId,
      planId,
      investmentId,
      isActive: true,
    });

    return investment;
  }

  async getUserInvestmentById(userId, investmentId) {
    const investment = await this.model.findOne({ _id: investmentId, userId });

    return investment;
  }

  async getInvestmentsByUser(userId, groupId) {
    return await this.model.find({
      userId,
      groupId,
    });
  }

  async getGroupsForUser(userId) {
    const result = await this.model.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: '$groupId',
        },
      },
      {
        $lookup: {
          from: 'groups',
          localField: '_id',
          foreignField: '_id',
          as: 'group',
        },
      },
      {
        $unwind: '$group',
      },
    ]);

    return result;
  }
}

module.exports = new InvestmentService();
