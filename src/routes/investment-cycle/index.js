const router = require('express').Router();
const { auth } = require('../../middleware/auth');
const InvestmentCycleController = require('./investment-cycle.controller');

router.post('/', auth, InvestmentCycleController.createInvestmentCycle());
router.get('/group/:groupId', InvestmentCycleController.getUsersForNextGroupResult());

module.exports = router;
