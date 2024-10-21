const Group = require('../models/group');
const { generateRandomNumber } = require('../utils/common');

class GroupService {
  constructor() {
    this.model = Group;
  }

  async createGroup(groupId) {
    const newGroup = await this.model.create({ groupId });

    return newGroup;
  }

  async getActiveGroup() {
    const group = await this.model.findOne({ isFreezed: false, isActive: true });

    if (!group) {
      const groupId = `GC${generateRandomNumber(5)}`;
      const newGroup = await this.createGroup(groupId);

      return newGroup;
    }

    return group;
  }
}

module.exports = new GroupService();
