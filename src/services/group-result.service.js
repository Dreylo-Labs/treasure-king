const GroupResult = require('../models/groupResult');

class GroupResultService {
  constructor() {
    this.model = GroupResult;
  }

  async getResultsByGroupId(groupId) {
    const result = await this.model.find({ groupId }).populate('investmentCycleId');

    return result;
  }

  async getLastCycleResult(groupId) {
    const result = await this.getResultsByGroupId(groupId);

    if (result.length === 0) return null;

    result.sort((a, b) => b.investmentCycleId.iteration - a.investmentCycleId.iteration )

    return result[0].investmentCycleId
  }
}

module.exports = new GroupResultService();
