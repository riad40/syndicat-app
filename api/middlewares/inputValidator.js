const { body } = require('express-validator/check')

const validate = (method) => {
    switch (method) {
        case 'login': {
            return [ 
                body('email').exists().isEmail(),
                body('password').isLength({min: 4}),
            ]   
        }
        case 'appaform' : {
            return [
                body('appartementOwner').exists(),
                body('appartementNumber').exists().isInt(),
                body('floorNumber').exists().isInt()
            ]
        }
        case 'paymentform' : {
            return [
                body('paymentAmount').exists().isInt(),
                body('monthsPayed').exists().isDate(),
                body('paymentId').exists().isString(),
            ]
        }
    }
}

module.exports = { validate }