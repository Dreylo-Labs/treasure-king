const router = require('express').Router();
const { adminAuth } = require('../../middleware/auth');
const PlanController = require('./plan.controller');

router.use(adminAuth);

router.post('/', adminAuth, PlanController.createPlan());
router.get('/', adminAuth, PlanController.getPlan());
router.delete('/delete/:id', adminAuth, PlanController.deletePlan());

module.exports = router;
