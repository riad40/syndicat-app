const express = require("express")
const router = express.Router()
const {
    createPayment,
    updatePayment,
    getPayments,
    getPayment,
} = require("../controllers/paymentController")
const { getOnePayment } = require("../middlewares/payment")
const { validate } = require("../middlewares/inputValidator")
const { authChecker } = require("../middlewares/auth")

router.get("/fetch-invoice", (req, res) => {
    res.sendFile(`documents/invoice.pdf`, { root: __dirname + "/../" })
})
router.post("/", authChecker, validate("paymentform"), createPayment)
router.get("/:payment_id", authChecker, getPayment)
router.put("/:payment_id", authChecker, validate("paymentform"), updatePayment)
router.get("/", authChecker, getPayments)

router.param("payment_id", getOnePayment)

module.exports = router
