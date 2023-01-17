const express = require("express")
const router = express.Router()
const { login, logout } = require("../controllers/authController")
const { validate } = require("../middlewares/inputValidator")
const { isloggedin } = require("../controllers/authController")

router.post("/login", validate("login"), login)
router.get("/isloggedin", isloggedin)
router.get("/logout", logout)

module.exports = router
