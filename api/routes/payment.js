const express = require('express')
const router = express.Router()
const { createPayment, updatePayment, getPayments, getPayment } = require('../controllers/paymentController')
const { getOnePayment } = require('../middlewares/payment')

router.post('/', validate('paymentform'), createPayment)
router.get('/:payment_id', getPayment)
router.put('/', validate('paymentform'), updatePayment)
router.get('/', getPayments)

router.param('payment_id', getOnePayment)

module.exports = router