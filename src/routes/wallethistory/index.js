const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');

const WalletHistoryController = require('./wallethistory.controller');
router.use(auth);


router.get('/',auth,WalletHistoryController.getwalletHistory())
module.exports = router;