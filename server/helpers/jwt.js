const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET


const signToken = (user) => {
    const {id} = user
    const payload = {id};
    return jwt.sign(payload, JWT_SECRET) //payload
}
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    signToken,
    verifyToken
}