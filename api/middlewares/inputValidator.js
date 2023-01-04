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
    }
}

module.exports = { validate }