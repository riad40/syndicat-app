const express = require('express')
const router = express.Router()
const { authChecker } = require('../middlewares/auth')
const { userProfile } = require('../controllers/userController')

// user
router.get('/me', authChecker, userProfile)

module.exports = router