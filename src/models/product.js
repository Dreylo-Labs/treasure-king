const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageUrl: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true }

});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;