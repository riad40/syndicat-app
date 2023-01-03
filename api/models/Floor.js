const mongoose = require('mongoose')

const floorSchema = new mongoose.Schema({

    floorNumber: {
        type: Number,
        required: true,
        max: 255,
    },
    
})

module.exports = mongoose.model('Floor', floorSchema)
