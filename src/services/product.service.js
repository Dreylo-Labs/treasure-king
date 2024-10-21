const Product = require('../models/product');


class ProductService {
  constructor() {
    this.model = Product;
  }

  async findAllProducts() {
    const products = await this.model.find();

    return { data: products };
  }

  async createProduct(data) {
    const product = await this.model.create(data);

    return product;
  }

  async updateProductById(id, productUpdates) {
    const product = await this.model.findByIdAndUpdate({ _id: id });
    if (!product) {
      throw new Error('Product not found.');
    }
    product.title = productUpdates.title;
    product.description = productUpdates.description;
    product.price = productUpdates.price;
    product.salePrice=productUpdates.salePrice
    await product.save();
    return product


  }


  async deleteProductById(id) {
    const product = await this.model.findByIdAndDelete(id);
    return { data:product}
  }


  async getOneProduct(id){
    const product= await this.model.findOne({_id:id})
    return {data:product}
  }
}

module.exports = new ProductService(Product);