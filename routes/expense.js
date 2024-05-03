const express = require('express');

const expenseController = require('../controllers/expense');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/add-expense', userAuthentication.authenticate, expenseController.postAddExpense);

router.get('/get-expenses', userAuthentication.authenticate, expenseController.getExpenses);

router.delete('/delete-expense/:id', userAuthentication.authenticate, expenseController.deleteExpense);

module.exports = router;