require('dotenv').config()
require('./config/init_db').setDefaultUser()
require('./config/config')
const express = require('express')

const app = express()

// middlwares for handling or parsing incoming requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const port = process.env.PORT

app.listen(port, (err) => {
    !err ? console.log('app running on port ' + port) : console.log(err) 
})

module.exports = app