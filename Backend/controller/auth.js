const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { createError } = require("../utils/error");
const User = require("../models/User");

exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            budget: req.body.budget
        })

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT);

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ user: user._doc, token: token })
    } catch (err) {

    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not Found!"))

        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isPassword) return next(createError(404, "Wrong password or username"))

        const token = jwt.sign({ id: user._id, email: user.email}, process.env.JWT);

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ user: user._doc, token: token })
    } catch (err) {

    }
}

exports.updateBudget = async(req,res) => {
    try{
        const user = jwt.decode(req.headers.authorization.split(' ')[1]);
        const expense = await User.findById(user.id);
        expense.budget = req.body.budget;
        await expense.save();
        res.status(200).json({
            message: 'User updated successfully!'
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Unable to update expense!'
        });
    }
}