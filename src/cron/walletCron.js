const cron = require("node-cron");
const Investment = require("../models/investment");
const Plan = require("../models/plan");
const Wallet = require("../models/wallet");
const WalletHistory = require("../models/wallethistory");
const NotificationService = require("../services/notification.service");



const addDailyReturnToWallets = async () => {
  try {
    const investments = await Investment.find().populate({ path: 'userId' });

    if (!investments.length) {
      console.error('No investment found.');
      return;
    }

    for (const investment of investments) {
      const { userId, planId } = investment;

      
      const plan = await Plan.findById(planId);

      if (!plan) {
        console.log(`No plan found for investment of user ${userId.phone}`);
        continue; 
      }

      const activeInvestment = await Investment.findOne({
        userId: userId._id,
        isActive: true,
      });

      if (activeInvestment) {
        const wallet = await Wallet.findOne({ userId: userId._id });

        if (wallet) {
          
          const dailyReturn = plan.returnAmount; 

          
          wallet.amount += dailyReturn; 
          await wallet.save();

          
          const newWalletHistory = new WalletHistory({
            amount: dailyReturn, 
            date: new Date(),
            type: ['Credit'], 
            wallet: wallet._id, 
            userId: userId._id,
          });

          await newWalletHistory.save();

          await NotificationService.createNotification({
            message: `Your wallet has been credited with ${dailyReturn} as a daily return from your plan.`,
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
    console.error('Error adding daily returns to wallets:', error);
  }
};


cron.schedule("0 6 * * *", () => {
  addDailyReturnToWallets();
});

// cron.schedule("*/20 * * * * *", () => {
//   console.log("Running cron job every seconds...");
//   addDailyReturnToWallets();
// });
