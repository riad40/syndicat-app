const jwt = require('jsonwebtoken');

const authChecker = (req, res, next) => {
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return  next({ error: true, status: 400, message: "Log in first" })  
    const user = jwt.verify(token, process.env.JWT_SECRET)   
    req.user = user
    next()
}    

module.exports = { authChecker }