const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');

exports.addExpense = async(req,res) => {
    try{
        console.log(req.headers.authorization.split(' ')[1]);
        // const token = req.headers.authorization.split(' ')[1];
        const user = jwt.decode(req.headers.authorization.split(' ')[1]);
        console.log(user);
        const expense = new Expense({
            email: user.email,
            name: req.body.name,
            amount: req.body.amount
        });
        const result = await expense.save();
        res.status(200).json({
            body: result, 
            message: 'Expense added successfully!'
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getExpenses = async(req,res) => {
    try{
        console.log(req.headers)
        const user = jwt.decode(req.headers.authorization.split(' ')[1]);
        console.log(user)
        const expenses = await Expense.find({email: user.email}).sort({createdAt: -1});
        res.status(200).json(expenses);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateExpense = async(req,res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        const oldExpense = expense.amount;
        expense.name = req.body.name;
        expense.amount = req.body.amount;
        await expense.save();
        res.status(200).json({
            body: expense,
            oldExpense: oldExpense,
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
        const expense = await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            _id: req.params.id,
            amount: expense.amount,
            message: 'Expense deleted successfully!'
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Unable to delete expense!'
        });
    }
};

