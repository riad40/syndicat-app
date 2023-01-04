const express = require('express')
const router = express.Router()
const { login, logout } = require('../controllers/authController')
const { validate } = require('../middlewares/inputValidator')
const { authChecker } = require('../middlewares/auth')

router.post('/login', validate('login'), login)
router.get('/isloggedin', authChecker)
router.get('/logout', logout)

module.exports = router