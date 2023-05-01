const express = require('express');

const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controller/Controller');

const router = express.Router();

router.post('/addExpense', addExpense);
router.get('/getExpenses', getExpenses);
router.put('/updateExpense/:id', updateExpense);
router.delete('/deleteExpense/:id', deleteExpense);

module.exports = router;