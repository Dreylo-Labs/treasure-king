const router = require('express').Router();
const { auth } = require('../../middleware/auth');
const InvestmentController = require('./investment.controller');

router.use(auth);

router.post('/', auth, InvestmentController.createInvestment());
router.get('/groups', auth, InvestmentController.getAllGroupsForUser());
router.get('/:groupId', auth, InvestmentController.getInvestmentsByUser());

module.exports = router;
