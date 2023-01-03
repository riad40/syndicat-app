const mongoose = require('mongoose')

const DB_LOCAL_URI = process.env.DB_LOCAL_URI
const DB_CLOUD_URI = process.env.DB_CLOUD_URI

mongoose.connect(DB_LOCAL_URI)
    .then(() => { console.log('connected succefully to syndicat') })
    .catch((err) => { console.log(err) })