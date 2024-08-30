const {UnauthenticatedError, ForbiddenError, CustomAPIError} = require('../errors')
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

const authorizePermissions = (...roles)=>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            throw new ForbiddenError('Unauthorized to access this route');
        }
        next();
    }
}

module.exports = {authenticationMiddleware, authorizePermissions}