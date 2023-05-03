const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./routes/expense')
const cors = require('cors')
const authRouter = require('./routes/auth')
const app = express()
dotenv.config()

const port = process.env.PORT || 3000

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log(`Connected to MongoDb.`)
    } catch (error) {
        throw error
    }
}

app.use(cors())
app.use(express.json())
app.use (cookieParser());
app.use("/",router)
app.use("/auth", authRouter)

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json(
        {
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack
        }
    )
})

app.listen(port, () => {
    connectdb();
    console.log(`Listening on Port ${port}`)
})