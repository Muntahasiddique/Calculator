const express = require('express');
const router = express.Router();
const calculatorController = require('../controller/calculatorController');

router.get('/', calculatorController.getCalculator);
router.post('/calculate', calculatorController.postCalculate);
router.get('/history', calculatorController.getHistory);
router.post('/clear-history', calculatorController.clearHistory);

module.exports = router;