const AdminService = require('../../services/admin.service');
const InvestmentCycleService = require('../../services/investment-cycle.service');
const BaseController = require('../base.controller');

class AdminController extends BaseController {
  constructor() {
    super();
    this.service = AdminService;
    this.investmentCycle = InvestmentCycleService
  }

  login() {
    return this.asyncWrapper(async (req) => {
      const { email, password } = req.body;

      const token = await this.service.login(email, password);

      return { data: token };
    });
  }

  getUsersForNextGroupResult() {
    return this.asyncWrapper(async (req) => {
      const { groupId } = req.params;

      const users = await this.investmentCycle.getUsersForNextGroupResult(groupId);

      return { data: users };
    });
  }
}

module.exports = new AdminController();
