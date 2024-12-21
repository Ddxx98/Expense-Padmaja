const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/', expenseController.createExpense);

router.get('/:userId', expenseController.getExpenses); 

router.delete('/:id', expenseController.deleteExpense);

module.exports = router;