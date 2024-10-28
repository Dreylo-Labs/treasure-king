const PlanService = require('../../services/plan.service');
const BaseController = require('../base.controller');

class PlanController extends BaseController {
  constructor() {
    super();
    this.service = PlanService;
  }

  createPlan() {
    return this.asyncWrapper(async (req) => {
      const { amount, returnAmount } = req.body;

      const plan = await this.service.createPlan(amount, returnAmount);

      return {
        data: plan,
        message: 'Plan created successfully',
        statusCode: 201,
      };
    });
  }

  getPlan() {
    return this.asyncWrapper(async () => {
      const plan = await this.service.getPlan();
      return {
        data: plan,
        statusCode: 201,
      };
    });
  }

  deletePlan() {
    return this.asyncWrapper(async (req, res) => {
      const { id } = req.params;
      const result = await this.service.deletePlan(id);
      if (result) {
        res.status(200).json({ message: 'Plan deleted successfully' });
      } else {
        res.status(404).json({ message: 'Plan not found' });
      }
    });
  }
}

module.exports = new PlanController();
