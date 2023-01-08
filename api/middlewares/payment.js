const Payment = require("../models/Payment")

const getOnePayment = (req, res, next, appa_id) => {
    Apparetement.findById(appa_id)
        .then((data) => {
            req.payment = data
            next()
        })
        .catch((err) => {
            return res.status(404).json({
                error: "payment not found",
            })
        })
}

module.exports = { getOnePayment }
