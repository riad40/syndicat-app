const express = require('express')
const router = express.Router()
const { login, logout } = require('../controllers/authController')
const { validate } = require('../middlewares/inputValidator')

router.post('/login', validate('login'), login)
router.get('/logout', logout)

module.exports = router