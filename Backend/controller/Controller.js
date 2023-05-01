const Expense = require('../models/Expense');

exports.addExpense = async(req,res) => {
    try{
        const expense = new Expense(req.body);
        await expense.save();
        res.status(200).json({
            message: 'Expense added successfully!'
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Unable to add expense!'
        });
    }
};

exports.getExpenses = async(req,res) => {
    try{
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    }
    catch(error){
        res.status(500).json({
            message: 'Unable to fetch expenses!'
        });
    }
};

exports.updateExpense = async(req,res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        expense.name = req.body.name;
        expense.amount = req.body.amount;
        await expense.save();
        res.status(200).json({
            message: 'Expense updated successfully!'
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Unable to update expense!'
        });
    }
};

exports.deleteExpense = async(req,res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Expense deleted successfully!'
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Unable to delete expense!'
        });
    }
};