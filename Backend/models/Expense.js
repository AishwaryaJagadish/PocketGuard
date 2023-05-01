const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);