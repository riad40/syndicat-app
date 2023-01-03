const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')

// login
const login = async (req, res, next) => {

    const { email, password } = req.body

    const errors = validationResult(req)

    try {

        // check if all credintials exist 
        if (!errors.isEmpty()) return next({ status: 400, error: true, message: errors.array() })

        // get the user by email
        const user = await User.findOne({ email: email })
        if(!user) return next({ error: true, status: 400, message: "email incorrect" })

        // check the password
        if(!await bcrypt.compare(password, user.password)) return next({ error: true, status: 400, message: "inccorect password" })
        const token = jwt.sign({_id: user._id } , process.env.JWT_SECRET, { expiresIn: '24h' })
        res
            .set('Authorization', `Bearer ${token}`)
            .json(200, { message: `Hi ${user.username} u've just logged in succefully`, token })

    } catch (error) {
        next({ status: 400, error: true, message: error })
    }

}

// logout
const logout = (req, res, next) => {
    try {
        res
            .removeHeader("Authorization")
            .send('log out succefully')
    } catch (err) {
        next({ error: true, status: 400, message: err.message })
    }
}

module.exports = { login, logout } 