const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth');


const AddressController = require('./address.controller');

router.use(auth);

router.post('/', auth, AddressController.address());
router.put('/update',auth,AddressController.updateAddress())
router.delete('/delete/:id',auth,AddressController.deleteAddress())
module.exports = router;
