const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

    paymentId: {
        type: Number,
        required: true,
        max: 255,
    },
    paymentAmount: {
        type: Number,
        required: true,
        max: 255,
    },
    monthsPayed: [{
        type: Date,
    }],
    appartement : {
        type: mongoose.Types.ObjectId,
        ref: 'appartements'
    }
    

})

module.exports = mongoose.model('Payment', paymentSchema)
