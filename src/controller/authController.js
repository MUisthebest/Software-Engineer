const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const {createTokenUser, attachCookiesToResponse} = require('../utils')

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
        throw new UnauthenticatedError('user not found')
    }

    const isPassword = await user.comparePassword(password)
    if (!isPassword){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.OK).json({user:tokenUser})
}

const dashboard = async (req,res)=>{
    res.status(200).json({msg:`Hello, ${req.user.name}`})
}

const logout = async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.cookie('user','',{
        expires: new Date(Date.now()),
    })
    res.status(200).json({msg:'user logged out!'})
}

module.exports = {
    register,
    login,
    logout,
    dashboard,
}