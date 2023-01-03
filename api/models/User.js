const mongoose = require('mongoose')
const { defaultImg } = require('../helpers/profile-image')
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        max: 255,
        min: 4
    },
    email: {
        type: String,
        required: true,
        max: 255    
    },
    password: {
        type: String,
        required: true,
        max: 1024    
    },  
    register_date: {
        type: Date,
        default: Date.now
    },
    city: {
        type: String,
        max: 1024     
    },
    image: {
        data: {
            type: Buffer, 
            default: defaultImg
        },
        contentType: {
            type: String, 
        }
    }
})

module.exports = mongoose.model('User', userSchema)