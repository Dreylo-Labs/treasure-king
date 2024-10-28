const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const Wallet = require("../models/wallet");
const WalletHistory = require("../models/wallethistory");
const Address = require("../models/address");
const AppError = require("../utils/app-error");
const { generateRandomNumber } = require("../utils/common");
const { gEnv } = require("../utils/env");
const fast2smsService = require("./fast2sms.service");
const NotificationService = require("./notification.service");

class UserService {
  constructor() {
    this.model = UserModel;
    this.walletmodel = Wallet;
    this.wallethistory = WalletHistory;
    this.address = Address;
    this.smsService = fast2smsService;
    this.NotificationService = NotificationService;
  }

  async signup(payload) {
    const { name, email, phone, preferralcode } = payload;

    const referralcode = `TKR${generateRandomNumber(7)}`;

    const userCheck = await this.model.findOne({ phone });
    if (userCheck) {
      throw new AppError("User already exists", 401);
    }

    const newUser = await this.model.create({
      name,
      email,
      phone,
      preferralcode,
      referralcode,
      isBlocked: false,
    });

    const otp = generateRandomNumber(4);
    newUser.wallet = 0;
    newUser.otp = otp;
    const ReferalCheck = await this.model.findOne({
      referralcode: preferralcode,
    });

    await newUser.save();
    const userId = newUser._id;
    const amount = 0;
    const Wallet = await this.walletmodel.create({ userId, amount });
    await Wallet.save();

    if (ReferalCheck) {
      const i = ReferalCheck._id;

      const userwallet = await this.walletmodel.findOne({ userId: i });

      let referrerWalletId;
      if (userwallet) {
        referrerWalletId = userwallet._id;
        userwallet.amount += 300;
        await userwallet.save();
      }

      await this.wallethistory.findOneAndUpdate(
        { wallet: userwallet._id },
        {
          $inc: { amount: 300 },
          $set: { date: new Date() },
        },
        { new: true, upsert: false }
      );

      await this.NotificationService.createNotification({
        message: `You have been credited 300 for the referral.`,
        userId,
      });
    }

    await this.wallethistory.create({
      amount: 0,
      date: new Date(),
      type: "Credit",
      wallet: Wallet._id,
      userId: userId,
    });

    await this.smsService.sendSMS(phone, otp);

    return newUser;
  }

  async login(phone) {
    const user = await this.model.findOne({ phone });

    if (!user) throw new AppError("User not found. Please sign up first.", 401);

    const otp = generateRandomNumber(4);

    user.otp = otp;
    await user.save();

    console.log(otp);

    await this.smsService.sendSMS(phone, otp);
  }

  async resendOtp(phone) {
    const user = await this.model.findOne({ phone });

    if (!user) throw new AppError("User not found. Please sign up first.", 401);

    const otp = generateRandomNumber(4);

    user.otp = otp;
    await user.save();

    console.log(otp);

    await this.smsService.sendSMS(phone, otp);
  }

  async verifyOtp(phone, otp) {
    const user = await UserModel.findOne({ phone, otp });

    if (!user) throw new AppError("Invalid OTP. Please try again.", 401);

    user.otp = undefined;
    await user.save();

    const payload = { userId: user._id };
    const secretKey = gEnv("JWT_SECRET");
    const options = { expiresIn: "7d" };
    const token = jwt.sign(payload, secretKey, options);

    return { token, user };
  }

  async mPin(mpin, confirmpin, userId) {
    const user = await this.model.findOne({ _id: userId });
    console.log(userId);

    if (mpin !== confirmpin) {
      throw new AppError("PINs do not match", 422);
    }

    const hash = bcrypt.hashSync(mpin, 8);

    user.mpin = hash;
    await user.save();
  }

  async verifyMpin(userId, mpin) {
    const user = await this.model.findOne({ _id: userId });

    const isMatch = await bcrypt.compare(mpin, user.mpin);

    if (!isMatch) {
      throw new AppError("wrong pin", 401);
    }

    user.mpin = undefined;

    const payload = { userId: user._id };
    const secretKey = gEnv("JWT_SECRET_MPIN");
    const options = { expiresIn: "7d" };
    const token = jwt.sign(payload, secretKey, options);
    return { token, user };
  }

  async forgotMpin(userId) {
    const data = await this.model.findOne({ _id: userId });
    if (!data) {
      throw new AppError("User not found.");
    }
    const phone = data.phone;
    const otp = generateRandomNumber(4);
    data.otp = otp;
    await data.save();
    await this.smsService.sendSMS(phone, otp);

    console.log(otp);
  }
  async getUser(userId) {
    const user = await this.model.findOne({ _id: userId });
    const wallet = await this.walletmodel.findOne({ userId });
    const address = await this.address.findOne({ userId });
    const userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth,
      referralcode: user.referralcode,
      preferralcode: user.preferralcode,
      address: address || null,
      walletamount: wallet ? wallet.amount : 0,
    };

    return { userData };
  }

  async updateUser(userUpdates, userId) {
    const existingUser = await this.model.findOne({ _id: userId });

    if (!existingUser) {
      throw new Error("User not found.");
    }
    existingUser.name = userUpdates.name;
    existingUser.email = userUpdates.email;
    existingUser.dateOfBirth = userUpdates.dateOfBirth;
    await existingUser.save();
    return existingUser;
  }
}

module.exports = new UserService();
