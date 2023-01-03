const User = require('../models/User')

const userProfile = async (req, res) => {    
    const me = req.user
    try {

        const user = await User.findOne({ _id: me._id })
        res.status(200).json({ error: false, message: `Hi ${user.username}, Welcome to your account` })
        
    } catch (error) {
        next({ status: 400, error: true, message: error })
    }
}

module.exports = { userProfile }
