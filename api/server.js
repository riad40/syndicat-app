require('dotenv').config()
require('./config/init_db').setDefaultUser()
require('./config/config')
const errorHandler = require('./middlewares/error-handler')
const express = require('express')

const app = express()

// middlwares for handling or parsing and validating incoming requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(errorHandler)

const port = process.env.PORT

app.listen(port, (err) => {
    !err ? console.log('app running on port ' + port) : console.log(err) 
})

module.exports = app