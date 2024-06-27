const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async (req,res)=>{
    const user = await User.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name}, token})
}

const login = async(req,res)=>{
    const {username, password} = req.body;
    if (!username || !password){
        throw new BadRequestError('Please provide username and password')
    }

    const user = await User.findOne({username})

    if (!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPassword = await user.comparePassword(password)
    if (!isPassword){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

const dashboard = async (req,res)=>{
    res.status(200).json({msg:`Hello, ${req.user.name}`})
}

module.exports = {
    register,
    login,
    dashboard,
}