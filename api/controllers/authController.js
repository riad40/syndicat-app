const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator/check")
const jwt = require("jsonwebtoken")

// login
const login = async (req, res, next) => {
    const { email, password } = req.body

    const errors = validationResult(req)

    try {
        // check if all credintials exist
        if (!errors.isEmpty())
            return next({ status: 400, error: true, message: errors.array() })

        // get the user by email
        const user = await User.findOne({ email: email })
        if (!user)
            return next({
                error: true,
                status: 400,
                message: "email incorrect",
            })

        // check the password
        if (!(await bcrypt.compare(password, user.password)))
            return next({
                error: true,
                status: 400,
                message: "inccorect password",
            })
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        })
        res.set("Authorization", `Bearer ${token}`).json(200, {
            message: `Hi ${user.username} u've just logged in succefully`,
            token,
            user: user.username,
        })
    } catch (error) {
        next({ status: 400, error: true, message: error })
    }
}

// isloggedin
const isloggedin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.json({ loggedIn: false })
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json({ loggedIn: false })
        const user = await User.findById(verified._id)
        if (!user) return res.json({ loggedIn: false })
        res.json({ loggedIn: true })
    } catch (err) {
        next({ error: true, status: 400, message: err.message })
    }
}

// logout
const logout = (req, res, next) => {
    try {
        res.removeHeader("Authorization")
        res.send("log out succefully")
    } catch (err) {
        next({ error: true, status: 400, message: err.message })
    }
}

module.exports = { login, logout, isloggedin }
