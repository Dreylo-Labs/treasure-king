const AdminService = require('../../services/admin.service');
const BaseController = require('../base.controller');

class AdminController extends BaseController {
  constructor() {
    super();
    this.service = AdminService;
  }

  login() {
    return this.asyncWrapper(async (req) => {
      const { email, password } = req.body;

      const token = await this.service.login(email, password);

      return { data: token };
    });
  }

  signup() {
    return this.asyncWrapper(async (req, res) => {
      const { email, password } = req.body;
      const newAdmin = await this.service.signup(email, password);
      res.json({ msg: 'Admin registered successfully', data: newAdmin });
    });
  }

  blockedUser() {
    return this.asyncWrapper(async (req) => {
      const { userId } = req.body;

      const user = await this.service.blockedUser(userId);

      return {
        data: user,
        message: 'User blocked',
      };
    });
  }
}

module.exports = new AdminController();
