const express = require('express');
const router = express.Router()

const {getSingleUser, updateUserPassword, getSingleProfile} = require('../controller/usersController')
const {authenticationMiddleware} = require('../middleware/authentication')

router.route('/user').get(authenticationMiddleware,getSingleUser);
router.route('/user/change-password').patch(authenticationMiddleware, updateUserPassword);
router.route('/user/edit-profile').patch(authenticationMiddleware, updateProfile).get(authenticationMiddleware, getEditProfile);
// router.route('/admin').get(authenticationMiddleware, authorizePermissions('admin'), getAllUsers)

module.exports = router