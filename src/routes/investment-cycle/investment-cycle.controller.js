const InvestmentCycleService = require('../../services/investment-cycle.service');
const BaseController = require('../base.controller');

class InvestmentCycleController extends BaseController {
  constructor() {
    super();
    this.service = InvestmentCycleService;
  }

  createInvestmentCycle() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const { amount, investmentId } = req.body;

      const newCycle = await this.service.createInvestmentCycle(userId, investmentId, amount);

      return { data: newCycle, statusCode: 201 };
    });
  }

  getUsersForNextGroupResult() {
    return this.asyncWrapper(async (req) => {
      const { groupId } = req.params;

      const users = await this.service.getUsersForNextGroupResult(groupId);

      return { data: users };
    });
  }
}

module.exports = new InvestmentCycleController();
