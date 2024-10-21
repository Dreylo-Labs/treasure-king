const cron = require("node-cron");
const Investment = require("../models/investment");
const Wallet = require("../models/wallet");
const WalletHistory = require("../models/wallethistory");
const NotificationService = require("../services/notification.service");



const addDailyReturnToWallets = async () => {
  try {
    
    const investments = await Investment.find().populate({ path: "userId" });

    if (!investments.length) {
      console.error("No investment found.");
      return;
    }

    for (const investment of investments) {
      const { userId } = investment;

      const activeInvestment = await Investment.findOne({
        userId: userId._id,
        isActive: true,
      });

      if (activeInvestment) {
        const wallet = await Wallet.findOne({ userId: userId._id });

        const walletHistory = await WalletHistory.findOne({
          userId: userId._id,
        });

        if (wallet) {
          wallet.amount += activeInvestment.returnAmount;

          await wallet.save();

          if (walletHistory) {
            walletHistory.amount = wallet.amount;
            walletHistory.date = new Date();
            walletHistory.timestamp = Date.now();

            await walletHistory.save();
          } else {
            console.log(`No wallet history found for user ${userId.phone}`);
          }

          await NotificationService.createNotification({
            message: `Your wallet has been credited with ${activeInvestment.returnAmount} as daily return.`,
            userId: userId._id,
          });
        } else {
          console.log(`No wallet found for user ${userId.phone}`);
        }
      } else {
        console.log(`No active investment found for user ${userId.phone}`);
      }
    }
  } catch (error) {
    console.error("Error adding daily returns to wallets:", error);
  }
};

cron.schedule("0 6 * * *", () => {
  addDailyReturnToWallets();
});

// cron.schedule("*/20 * * * * *", () => {
//   console.log("Running cron job every seconds...");
//   addDailyReturnToWallets();
// });
