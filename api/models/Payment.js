const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        max: 255,
    },
    paymentAmount: {
        type: Number,
        required: true,
    },
    monthsPayed: [
        {
            type: Date,
        },
    ],
    appartement: {
        type: mongoose.Types.ObjectId,
        ref: "Apparetement",
    },
})

module.exports = mongoose.model("Payment", paymentSchema)
