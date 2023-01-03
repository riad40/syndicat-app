const { body } = require('express-validator/check')

const validate = (method) => {
    switch (method) {
        case 'login': {
            return [ 
                body('email').exists().isEmail(),
                body('password').isLength({min: 4}),
            ]   
        }
    }
}

module.exports = { validate }