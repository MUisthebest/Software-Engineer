const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const register = async (req,res)=>{
    const user = await User.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token})
}

const login = async(req,res)=>{
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:'Please provide email and password'})
    }

    const user = await User.findOne({username})

    if (!user){
        return res.status(StatusCodes.NOT_FOUND).json({msg:'not found'})
    }

    const isPassword = await user.comparePassword(password)
    if (!isPassword){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid Credentials'})
    }

    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

module.exports = {
    register,
    login,
}