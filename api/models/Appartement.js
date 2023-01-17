const mongoose = require("mongoose")

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
    lastMonthPaid: {
        type: Date,
        default: Date.now,
    },
    floorNumber: {
        type: mongoose.Types.ObjectId,
        ref: "Floor",
    },
})

module.exports = mongoose.model("Apparetement", appartementSchema)
