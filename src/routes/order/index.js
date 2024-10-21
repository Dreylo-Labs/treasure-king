const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth');

const OrderController = require('./order.controller');

router.use(auth);


router.post('/create/:id', auth, OrderController.createOrder());
router.get('/',auth,OrderController.getorder())


module.exports = router;
