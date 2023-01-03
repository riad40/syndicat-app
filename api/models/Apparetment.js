const mongoose = require('mongoose')

const apparetmentSchema = new mongoose.Schema({

    apparetmentNumber: {
        type: Number,
        required: true,
        max: 255,
    },
    floorNumber: {
        type: mongoose.Types.ObjectId,
        ref: 'floors'
    }

})

module.exports = mongoose.model('Apparetement', apparetmentSchema)
