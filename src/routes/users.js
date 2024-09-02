const express = require('express');
const router = express.Router()

const {getSingleUser, updateUserPassword, updateProfile, getEditProfile, deleteUser} = require('../controller/usersController')
const {authenticationMiddleware, authorizePermissions} = require('../middleware/authentication')

router.route('/user').get(authenticationMiddleware,getSingleUser);
router.route('/user/change-password').patch(authenticationMiddleware, updateUserPassword);
router.route('/user/edit-profile').patch(authenticationMiddleware, updateProfile).get(authenticationMiddleware, getEditProfile);
router.route('/admin/users-management').patch(authenticationMiddleware, authorizePermissions('admin'), deleteUser);

module.exports = router