const Payment = require("../models/Payment")
const Apparetement = require("../models/Appartement")
const { validationResult } = require("express-validator/check")
const pdf = require("html-pdf-phantomjs-included")
const invoiceTemplate = require("../documents/invoice-template")

const createPayment = async (req, res, next) => {
    const { paymentId, paymentAmount, monthsPayed, appartement } = req.body

    const errors = validationResult(req)

    try {
        // check for request body
        if (!errors.isEmpty())
            return next({ status: 400, error: true, message: errors.array() })

        // get the floor number
        const appartementId = await Apparetement.findOne({ appartement })

        // create new record
        const payment = new Payment({
            paymentId,
            paymentAmount,
            monthsPayed,
            appartement: appartementId._id,
        })
        await payment.save()

        // update the appartement last month paid
        await Apparetement.updateOne(
            { _id: appartementId._id },
            { lastMonthPaid: monthsPayed }
        )

        // generate invoice
        if (payment && appartementId) {
            await pdf
                .create(
                    invoiceTemplate({
                        paymentId: payment.paymentId,
                        paymentAmount: payment.paymentAmount,
                        paymentDate: payment.monthsPayed,
                        totalPaid: payment.paymentAmount,
                        appartementNumber: appartementId.appartementNumber,
                        appartementOwner: appartementId.appartementOwner,
                    }),
                    {}
                )
                .toFile("documents/invoice.pdf", (err) => {
                    if (err) {
                        next({ status: 400, error: true, message: err })
                        console.log(err)
                    }
                })
        }
        res.json(200, {
            message: "New Payment Created Succefully",
            payment,
            appartementId,
        })
    } catch (error) {
        next({ status: 400, error: true, message: error })
        console.log(error)
    }
}

const updatePayment = async (req, res, next) => {
    const { paymentId, paymentAmount, monthsPayed, appartement } = req.body

    const errors = validationResult(req)

    try {
        // check for request body
        if (!errors.isEmpty())
            return next({ status: 400, error: true, message: errors.array() })

        // get the floor number
        const appartementId = await Apparetement.findOne({
            appartement: appartement,
        })

        // create new record
        const payment = await Payment.updateOne(
            { _id: req.payment._id },
            {
                $set: {
                    paymentId,
                    paymentAmount,
                    monthsPayed,
                    appartement: appartementId._id,
                },
            }
        )

        res.json(200, { message: "Payment Updated Succefully" })
    } catch (error) {
        console.log(error)
        next({ status: 400, error: true, message: error })
    }
}

const getPayment = async (req, res) => {
    res.json(200, { data: await req.payment })
}

const getPayments = async (req, res, next) => {
    Payment.find()
        .populate("appartement")
        .then((data) => {
            res.json(200, { data })
        })
        .catch((err) => {
            next({ status: 400, error: true, message: err })
        })
}

module.exports = { createPayment, updatePayment, getPayment, getPayments }
