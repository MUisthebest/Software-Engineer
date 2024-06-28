const jwt = require('jsonwebtoken')
const {UnauthenticatedError, ForbiddenError} = require('../errors')

const authenticationMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication failed')
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name}
        next();
    } catch(error){
        throw new ForbiddenError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware