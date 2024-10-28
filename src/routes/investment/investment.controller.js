const InvestmentService = require("../../services/investment.service");
const BaseController = require("../base.controller");

class InvestmentController extends BaseController {
  constructor() {
    super();
    this.service = InvestmentService;
  }

  createInvestment() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const { planId } = req.body;

      const investment = await this.service.createInvestment(userId, planId);

      return {
        data: investment,
        message: "Investment created successfully",
        statusCode: 201,
      };
    });
  }

  getAllGroupsForUser() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;

      const groups = await this.service.getGroupsForUser(userId);

      return { data: groups };
    });
  }

  getInvestmentsByUser() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const { groupId } = req.params;

      const investments = await this.service.getInvestmentsByUser(
        userId,
        groupId
      );

      return {
        data: investments,
      };
    });
  }
}

module.exports = new InvestmentController();
