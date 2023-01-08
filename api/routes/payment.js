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

router.post("/", authChecker, validate("paymentform"), createPayment)
router.get("/:payment_id", authChecker, getPayment)
router.put("/", authChecker, validate("paymentform"), updatePayment)
router.get("/", authChecker, getPayments)

router.param("payment_id", getOnePayment)

module.exports = router
