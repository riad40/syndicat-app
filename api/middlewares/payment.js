const Payment = require("../models/Payment")

const getOnePayment = (req, res, next, payment_id) => {
    console.log(payment_id)
    Payment.findById(payment_id)
        .populate("appartement")
        .then((data) => {
            req.payment = data
            next()
        })
        .catch((err) => {
            console.log(err)
            return res.status(404).json({
                error: "payment not found",
            })
        })
}

module.exports = { getOnePayment }
