const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
 
  userId: {type:String,ref:'User',required: true },
  productId: { type:String,  ref: 'Product',required: true },
  name:{type:String},
  email:{type:String},
  phone:{type:String},
  title:{type:String},
  imageUrl:{type:String},
  description:{type:String},
  price:{type:Number},
  salePrice:{type:Number}

});

const order = mongoose.model('order', orderSchema);

module.exports =order;
