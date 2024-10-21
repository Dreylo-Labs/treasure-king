const WalletModel = require('../models/wallet');
const AppError = require('../utils/app-error');
const UserModel = require("../models/user");
const WalletHistory = require("../models/wallethistory")
class WalletService {
  constructor() {
    this.model = WalletModel;
    this.usermodel = UserModel;
    this.wallethistory = WalletHistory
  }



  async getWallet(userId) {
    const wallet = await this.model.findOne({ userId });

    if (!wallet) {
      throw new AppError('Wallet not exist please create', 404);
    }
    return { balance: wallet.amount };
  }

  async transferMoney(fromUserId, toPhone, amount) {
    const fromWallet = await this.model.findOne({ userId: fromUserId });
    const toUser = await this.usermodel.findOne({ "phone": toPhone })
    const toWallet = await this.model.findOne({ "userId": toUser._id })


    if (!fromWallet || !toWallet) {
      throw new AppError('Invalid phone number. Wallet not found for one or both users.', 404);
    }

    if (fromWallet.amount < amount) {
      throw new AppError('Insufficient balance for the transfer.', 202);
    }

    fromWallet.amount -= amount;
    toWallet.amount += amount;

    await fromWallet.save();
    await toWallet.save();
    const fromUser = await this.usermodel.findOne({ _id: fromUserId })
    const to = toUser._id
    const from = fromUserId
    const detail = `transfer amount from ${fromUser.name} to ${toUser.name}`
    const wallethistory = await this.wallethistory.create({ amount, to, from, detail })
    await wallethistory.save()

    return { senderBalance: fromWallet.amount, recieverBalance: toWallet.amount };

  }

  async addMoney(toPhone, amount) {

    const user = await this.usermodel.findOne({ "phone": toPhone });
    const id = user._id
    const wallet = await this.model.findOne({ "userId": id })

    if (!wallet) {
      throw new AppError('Wallet not found for the specified user.', 404);
    }

    wallet.amount = wallet.amount + amount;
    await wallet.save();

    const to = id
    const from = "admin"
    const detail = "add by admin"

    const wallethistory = await this.wallethistory.create({ amount, to, from, "detail": detail })
    await wallethistory.save()


    return wallet;
  }
}

module.exports = new WalletService();
