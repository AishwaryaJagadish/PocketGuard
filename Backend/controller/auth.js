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
        })

        await newUser.save();
        res.status(200).send("User has been created ")
    } catch (err) {

    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not Found!"))

        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isPassword) return next(createError(404, "Wrong password the username"))

        const token = jwt.sign({ id: user._id}, process.env.JWT);

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ user: user._doc, token: token })
    } catch (err) {

    }
}