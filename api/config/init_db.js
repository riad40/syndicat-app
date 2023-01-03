const User = require('../models/User')
const bcrypt = require('bcryptjs')
const Floor = require('../models/Floor')

const initDb = async () => {
    try {
        // set the default user
        const hashedPassword = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD, await bcrypt.genSalt(10))
        const countUsers = await User.countDocuments()
        if(countUsers === 0) {
            const user = new User({ 
                username: process.env.DEFAULT_USER_USERNAME,
                email: process.env.DEFAULT_USER_EMAIL,
                password: hashedPassword,  
                city: process.env.DEFAULT_USER_CITY
            })
            await user.save()
        }
        // set the the building floors
        const countFloors = await Floor.countDocuments()
        if(countFloors === 0) {
            for(i=1;i<=process.env.BUILDING_FLOORS;i++) {
                const floor = new Floor({ floorNumber: i })
                await floor.save()
            }
        }

    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = { initDb }
