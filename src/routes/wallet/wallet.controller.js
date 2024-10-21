const WalletService = require('../../services/wallet.service');
const BaseController = require('../base.controller.js');

class WalletController extends BaseController {
  constructor() {
    super();
    this.service = WalletService;
  }
  createWallet() {
    return this.asyncWrapper(async (req) => {
      const { amount } = req.body;
      const { _id: userId } = req.user;

      const wallet = await this.service.createWallet(userId, amount);

      return {
        data: wallet,
        message: 'wallet created successfully',
        statusCode: 201,
      };
    });
  }

  getWallet() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const wallet = await this.service.getWallet(userId);

      return {
        data: wallet,
        message: 'Wallet balance retrieved successfully',
      };
    });
  }

  transferMoney() {
    return this.asyncWrapper(async (req) => {
      const { toPhone, amount } = req.body;
      const { _id: userId } = req.user;

      const result = await this.service.transferMoney(userId, toPhone, amount);

      return {
        data: result,
        message: 'Money transferred successfully',
      };
    });
  }

  addMoney() {
    return this.asyncWrapper(async (req) => {
      const { toPhone, amount } = req.body;

      const wallet = await this.service.addMoney(toPhone, amount);


      return {
        data: wallet.toJSON(),
        message: 'Money added to the wallet successfully',
        statusCode: 200,
      };
    });
  }
}
module.exports = new WalletController();
