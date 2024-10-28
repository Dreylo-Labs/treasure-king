const Plan = require('../models/plan');

class PlanService {
  constructor() {
    this.model = Plan;
  }

  async createPlan(amount, returnAmount) {
    const plan = await this.model.create({
      amount,
      returnAmount,
    });

    return plan;
  }

  async getPlan() {
    const plan = await this.model.find();
    return plan;
  }

  async deletePlan(id) {
    
    const plan = await this.model.findByIdAndDelete(id);

    return plan; 
  }
}

module.exports = new PlanService();
