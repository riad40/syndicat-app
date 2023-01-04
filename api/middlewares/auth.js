const jwt = require('jsonwebtoken');

const authChecker = (req, res, next) => {

    try {
        
        // get the authorization header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
        // check if its exist
        if (!token) return res.json(400, { loggedIn: false })

        // verify token
        const user = jwt.verify(token, process.env.JWT_SECRET)   
        req.user = user
        res.json(200, { loggedIn: true })
        next()

    } catch (err) {
        next({ status: 400, error: true, message: err })
    }
    
}    

module.exports = { authChecker }