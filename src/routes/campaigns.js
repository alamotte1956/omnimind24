const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const campaignController = require('../controllers/campaignController');

// All routes require authentication
router.use(auth);
// Campaign CRUD
router.post('/', campaignController.create);
router.get('/', campaignController.getUserCampaigns);
router.get('/:id', campaignController.getCampaign);
router.put('/:id', campaignController.update);
router.delete('/:id', campaignController.delete);

// Campaign processing
router.post('/:id/process', campaignController.process);
router.get('/:id/results', campaignController.getResults);

module.exports = router;
