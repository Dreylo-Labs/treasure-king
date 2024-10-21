const BaseController = require('../base.controller.js');
const userService = require('../../services/user.service.js');

class UserController extends BaseController {
  constructor() {
    super();
    this.service = userService;
  }

  signup() {
    return this.asyncWrapper(async (req) => {
      const user = await this.service.signup(req.body);

      return {
        data: user.toJSON(),
        message: "User registered successfully",
        statusCode: 201,
      };
    });
  }

  login() {
    return this.asyncWrapper(async (req) => {
      const { phone } = req.body;

      await this.service.login(phone);

      return {
        data: undefined,
        message: "OTP sent",
      };
    });
  }

  resendOtp() {
    return this.asyncWrapper(async (req) => {
      const { phone } = req.body;

      await this.service.resendOtp(phone);

      return {
        data: undefined,
        message: "OTP resent successfully",
      };
    });
  }

  verifyOtp() {
    return this.asyncWrapper(async (req) => {
      const { phone, otp } = req.body;

      const data = await this.service.verifyOtp(phone, otp);

      return {
        data,
        message: "User logged in",
      };
    });
  }

  mPin() {
    return this.asyncWrapper(async (req) => {
      const { mpin, confirmpin } = req.body;
      const { _id: userId } = req.user;

      await this.service.mPin(mpin, confirmpin, userId);

      return {
        message: "PIN created successfully",
      };
    });
  }

  verifyMpin() {
    return this.asyncWrapper(async (req) => {
      const { mpin } = req.body;
      const { _id: userId } = req.user;

      const data = await this.service.verifyMpin(userId, mpin);

      return {
        message: "PIN verified",
        data,
      };
    });
  }

  forgotMpin() {
    return this.asyncWrapper(async (req) => {
      await this.service.forgotMpin(req.user._id);

      return {
        message: "OTP sent",
      };
    });
  }
  getUser() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const user = await this.service.getUser(userId);

      return {
        data: user,
        message: "user Data",
      };
    });
  }
  updateUser() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;

      const userUpdates = req.body;
      const updatedUser = await this.service.updateUser(userUpdates, userId);

      return {
        data: updatedUser.toJSON(),
        message: "user updated successfully",
        statusCode: 200,
      };
    });
  }
}

module.exports = new UserController();
