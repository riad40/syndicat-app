const mongoose = require("mongoose")

// const DB_URI = process.env.DB_LOCAL_URI

mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then(() => {
        console.log("connected succefully to syndicat")
    })
    .catch((err) => {
        console.log(err)
    })
