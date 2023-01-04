const mongoose = require('mongoose')

const appartementSchema = new mongoose.Schema({

    appartementNumber: {
        type: Number,
        required: true,
        max: 255,
    },
    appartementOwner: {
        type: String,
        required: true,
        max: 255,
    },
    floorNumber: {
        type: mongoose.Types.ObjectId,
        ref: 'floors'
    },

})

module.exports = mongoose.model('Apparetement', appartementSchema)
