const AddressModel = require('../models/address');


class AddressService {
  constructor() {
    this.model = AddressModel;
  }

  async createAddress(address, userId) {
    const newAddress = await this.model.create({ ...address, userId });

    return newAddress;
  }
  async updateAddress(addressUpdates, userId) {
    const existingAddress = await this.model.findOne({ userId });

    if (!existingAddress) {
      throw new Error('Address not found or you are not authorized to update it.');
    }

    existingAddress.street = addressUpdates.street;
    existingAddress.city=addressUpdates.city;
    existingAddress.state = addressUpdates.state;
    existingAddress.pincode = addressUpdates.pincode;
    existingAddress.country=addressUpdates.country;
    await existingAddress.save();

    return existingAddress;
  }

  async deleteAddress(userId) {

   const address = await this.model.findOne({userId })

    return address


  }


}

module.exports = new AddressService();
