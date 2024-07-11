const {UnauthenticatedError, ForbiddenError} = require('../errors')
const {isTokenValid} = require('../utils')

const authenticationMiddleware = async (req,res,next)=>{
    const token = req.signedCookies.token;
    if (!token){
        throw new UnauthenticatedError('Authentication Invalid');
    }

    try{
        const payload = isTokenValid({token});
        req.user = {userId:payload.userId, name:payload.name, role:payload.role};
        next();
    } catch(error){
        throw new ForbiddenError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware