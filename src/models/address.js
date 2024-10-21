const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  state: { type: String, required: true },
  country: { type: String},
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
