const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {NotFoundError, BadRequestError, UnauthenticatedError} = require('../errors')

const getSingleUser = async (req,res)=>{
    const userId = req.user.userId
    const user = await User.findOne({_id: userId});

    if (!user){
        throw new NotFoundError(`No user with id: ${userId}`)
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "User.ejs", user:user, userId})
}

const getEditProfile = async (req,res)=>{
    const userId = req.user.userId
    const user = await User.findOne({_id: userId});

    if (!user){
        throw new NotFoundError(`No user with id: ${userId}`)
    }
    res.status(StatusCodes.OK).render("Layout.ejs",{filename: "editProfile.ejs", user:user, userId})
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
    res.status(StatusCodes.OK).json({msg:'Password successfully changed!'})
}

const updateProfile = async (req, res)=>{
    const userId = req.user.userId
    const user = await User.findOneAndUpdate({_id: userId}, req.body, {
        new: true,
        runValidators:true
    })

    if (!user){
        throw new NotFoundError('No user found with id: ${userId}');
    }

    res.status(StatusCodes.OK).json({msg:'Profile successfully changed!'})
}

const deleteUser = async(req, res) => {
    const userId = req.body.userId
    const user = await User.findOneAndDelete({_id: userId})
    if (!user){
        throw new NotFoundError(`There is no users with the id: ${userId}`)
    }

    res.status(StatusCodes.OK).json({user})
}

module.exports = {
    getSingleUser,
    getEditProfile,
    updateUserPassword,
    updateProfile,
    deleteUser,
}