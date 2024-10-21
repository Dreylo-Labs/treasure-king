const userRouter = require("./user");
const adminRouter = require("./admin");
const walletRouter = require("./wallet");
const addressRouter = require("./address");
const investmentRouter = require("./investment");
const investmentCycleRouter = require("./investment-cycle");
const walletHistoryRouter = require("./wallethistory");
const productRouter = require("./product");
const orderRouter = require("./order");
const notificationRouter = require("./notification");
// const investmentRouter = require('./investment');
// const investmentCycleRouter = require("./investment-cycle");

module.exports = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/wallet", walletRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/investment", investmentRouter);
  app.use("/api/v1/investment-cycle", investmentCycleRouter);
  app.use("/api/v1/history", walletHistoryRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/order", orderRouter);
  app.use("/api/v1/investment", investmentRouter);
  app.use("/api/v1/investment-cycle", investmentCycleRouter);
  app.use("/api/v1/notification", notificationRouter);
};
