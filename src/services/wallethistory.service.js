const path = require('path');
const WalletHistory = require('../models/wallethistory');

class WalletHistoryService {
  constructor() {
    this.model = WalletHistory;
  }
  async getWalletHistory(userId) {
    return await this.model
      .findOne({ userId: userId })
      .populate([{ path: 'wallet', select: 'amount' }, { path: 'userId' }]);
  }
}

module.exports = new WalletHistoryService();
