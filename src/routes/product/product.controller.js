const ProductService = require('../../services/product.service');
const BaseController = require('../base.controller.js');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile } = require('../../services/s3')



class ProductController extends BaseController {
  constructor() {
    super();
    this.service = ProductService;
  }
  findAllProducts() {
    return this.asyncWrapper(async (req) => {
      const products = await this.service.findAllProducts();

      return { data: products }
    });

  }
  createProduct() {
    return this.asyncWrapper(async (req) => {
      const { body: data } = req;
      const product = await this.service.createProduct(data);
      return {
        product,
        message: "product create"
      }

    });

  }
  updateProductById() {
    return this.asyncWrapper(async (req) => {
      const { id } = req.params;
      const productUpdates = req.body;
      const product = await this.service.updateProductById(id, productUpdates);
      return {
        data: product,
        message: "product updated"
      }
    });

  }
  uploadImage() {
    return this.asyncWrapper(async (req, res) => {
      const file = req.file

      const result = await uploadFile(file)
      await unlinkFile(file.path)

      return { message: "file uploaded", imagePath: `/images/${result.Key}` }
    })
  }
  deleteProductById() {
    return this.asyncWrapper(async (req) => {
      const { id } = req.params;
      const product = await this.service.deleteProductById(id);
      return {
        data: product,
        message: "product delete"

      }
    });
  }
  getOneProduct() {
    return this.asyncWrapper(async (req) => {
      const { id } = req.params;
      const product = await this.service.getOneProduct(id);

      return {
        data: product,
        message: "product retrieve"

      }
    });

  }

}
module.exports = new ProductController();