const WalletHistoryService = require("../../services/wallethistory.service");
const BaseController = require("../base.controller.js");

class WalletHistoryController extends BaseController {
  constructor() {
    super();
    this.service = WalletHistoryService;
  }
  getwalletHistory() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;

      const history = await this.service.getWalletHistory(userId);

      return {
        data: history,
        message: "Wallet History",
      };
    });
  }
}
module.exports = new WalletHistoryController();
