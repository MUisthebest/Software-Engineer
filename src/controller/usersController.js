const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError, UnauthenticatedError} = require('../errors')

const getSingleUser = async (req,res)=>{
    const {id: userId} = req.params
    const user = await User.findOne({_id: userId});

    if (!user){
        throw new NotFoundError(`No user with id: ${userId}`)
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "User.ejs", user:user, userId})
}

const updateUserPassword = async (req,res)=>{
    const {currentPassword, newPassword, confirmPassword} = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
        throw new BadRequestError('Please fill in all the fields')
    }

    if (newPassword !== confirmPassword){
        throw new BadRequestError('Password does not match!')
    }

    const user = await User.findOne({_id: req.user.userId});
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect){
        throw new UnauthenticatedError('Wrong password');
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg:'Password changed!'})
}

module.exports = {
    getSingleUser,
    updateUserPassword,
}