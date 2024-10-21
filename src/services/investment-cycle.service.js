const InvestmentCycle = require('../models/investmentCycle');
const InvestmentService = require('./investment.service');
const GroupResultService = require('./group-result.service');
const AppError = require('../utils/app-error');

class InvestmentCycleService {
  constructor() {
    this.model = InvestmentCycle;
    this.investmentService = InvestmentService;
    this.groupResultService = GroupResultService;
  }

  async createInvestmentCycle(userId, investmentId, amount) {
    const investment = await this.investmentService.getUserInvestmentById(userId, investmentId);

    if (!investment) throw new AppError('No investment found', 404);

    const lastCycle = await this.groupResultService.getLastCycleResult(investment.groupId);

    if (!lastCycle) {
      const [latestCycle] = await this.model.find({ investmentId }).sort('-iteration').limit(1);

      if (!latestCycle) {
        const investmentCycle = await this.model.create({
          iteration: 1,
          groupId: investment.groupId,
          investmentId: investment._id,
          userId: userId,
          amount,
        });
  
        return investmentCycle;
      }

      const newCycle = await this.model.create({
        iteration: latestCycle.iteration + 1,
        groupId: investment.groupId,
        investmentId: investment._id,
        userId: investment.userId,
        amount,
      });

      return newCycle;
    }

    const [latestCycle] = await this.model.find({ investmentId }).sort('-iteration').limit(1);

    if (latestCycle.iteration < lastCycle.iteration) {
      throw new AppError('You have not made your last week investment, You cannot play', 401);
    }

    const newCycle = await this.model.create({
      iteration: latestCycle.iteration + 1,
      groupId: investment.groupId,
      investmentId: investment._id,
      userId: investment.userId,
      amount,
    });

    return newCycle;
  }

  async getUsersForNextGroupResult(groupId) {
    const result = await this.groupResultService.getResultsByGroupId(groupId);

    if (result.length === 0) {
      const lastCycle = await this.model
        .find({
          iteration: 1,
          gamePlayed: true,
        })
        .populate('userId');

      return lastCycle.map((val) => val.userId);
    }

    result.sort((a, b) => b.investmentCycleId.iteration - a.investmentCycle.iteration);

    const lastCycle = await this.model
      .find({
        iteration: result[0].investmentCycleId.iteration,
        gamePlayed: true,
      })
      .populate('userId');

    return lastCycle.map((val) => val.userId);
  }

  async getInvestmentCycleByUser(userId, investmentId) {
    return await this.model.find({
      userId,
      investmentId,
    });
  }
}

module.exports = new InvestmentCycleService();
