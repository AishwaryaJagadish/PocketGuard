const express = require("express");
const { register, login, updateBudget } = require("../controller/auth");

const authRouter = express.Router();

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.put("/updateBudget", updateBudget)

module.exports = authRouter