const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.setDefaultUser = async () => {
    try {
        const hashedPassword = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD, await bcrypt.genSalt(10))
        const count = await User.countDocuments()
        if(count === 0) {
            const user = new User({ 
                username: process.env.DEFAULT_USER_USERNAME,
                email: process.env.DEFAULT_USER_EMAIL,
                password: hashedPassword,  
                city: process.env.DEFAULT_USER_CITY
            })
            await user.save()
        }
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}