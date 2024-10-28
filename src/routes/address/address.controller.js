const AddressService = require('../../services/address.service');
const BaseController = require('../base.controller');

class AddressController extends BaseController {
  constructor() {
    super();
    this.service = AddressService;
  }
  address() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const address = await this.service.createAddress(req.body, userId);

      return {
        data: address.toJSON(),
        message: 'address registered successfully',
        statusCode: 201,
      };
    });
  }
  updateAddress() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;

      const addressUpdates = req.body;
      const updatedAddress = await this.service.updateAddress(addressUpdates, userId);

      return {
        data: updatedAddress.toJSON(),
        message: 'Address updated successfully',
        statusCode: 200,
      };
    })
  }
  deleteAddress() {
    return this.asyncWrapper(async (req) => {
      const { _id: userId } = req.user;
      const { id: addressId } = req.params;
      
      const address = await this.service.deleteAddress(userId, addressId);
      return {

        message: 'Address has been deleted successfully'
      }

    })
  }







}
module.exports = new AddressController();
