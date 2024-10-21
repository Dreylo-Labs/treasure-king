const express = require('express');
const router = express.Router();

const { auth } = require('../../middleware/auth');

const WalletController = require('./wallet.controller');

router.use(auth);


router.get('/', auth, WalletController.getWallet());
router.post('/transfer-money', auth, WalletController.transferMoney());
router.post('/add-money', auth, WalletController.addMoney());

module.exports = router;
