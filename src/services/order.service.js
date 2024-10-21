const orderModel = require('../models/order');
const AppError = require('../utils/app-error');
const productModel = require('../models/product')
const UserModel = require('../models/user')

class orderService {
  constructor() {
    this.model = orderModel;
    this.product = productModel
    this.user = UserModel
  }

  async createOrder(userId, productId) {
    const user = await this.user.findOne({ _id: userId });
    const product = await this.product.findOne({ _id: productId });


    const { name, email, phone } = user;
    const { imageUrl, title, description, price, salePrice } = product;


    const orderData = {
      userId,
      productId,
      name,
      email,
      phone,
      title,
      imageUrl,
      description,
      price,
      salePrice,
    };

    const order = await this.model.create(orderData);

    return { data: order };
  }

  async getorder(userId) {
    const order = await this.model.find({ userId: userId });

    return { data: order };
  }



}

module.exports = new orderService();