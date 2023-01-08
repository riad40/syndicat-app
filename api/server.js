require("dotenv").config()
require("./config/init_db").initDb()
require("./config/config")
const errorHandler = require("./middlewares/error-handler")
const cors = require("cors")
const express = require("express")

const app = express()

// middlwares for handling or parsing and validating incoming requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// cors middlware
app.use(cors({ origin: true, credentials: true }))

const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const appartementRouter = require("./routes/apparetment")
const paymentRouter = require("./routes/payment")
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/appartements", appartementRouter)
app.use("/api/payments", paymentRouter)

app.use(errorHandler)

const port = process.env.PORT

app.listen(port, (err) => {
    !err ? console.log("app running on port " + port) : console.log(err)
})

module.exports = app
