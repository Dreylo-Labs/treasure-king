const orderService = require('../../services/order.service');
const BaseController = require('../base.controller.js');

class orderController extends BaseController {
  constructor() {
    super();
    this.service = orderService;
  }
  createOrder() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const { id: productId } = req.params;

      const order = await this.service.createOrder(userId, productId);
      return {
        data: order,
        message: "order create"
      }

    });

  }

  getorder() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;

      const order = await this.service.getorder(userId);


      return {
        data: order,
        message: 'order Data',
      };
    });
  }











}
module.exports = new orderController();