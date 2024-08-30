const express = require('express');
const router = express.Router()

const {getSingleUser, updateUserPassword, getSingleProfile} = require('../controller/usersController')
const {authenticationMiddleware} = require('../middleware/authentication')

router.route('/user/:id').get(authenticationMiddleware,getSingleUser);
router.route('/profile/:id').get(authenticationMiddleware,getSingleProfile);
router.route('/user/changePassword').patch(authenticationMiddleware, updateUserPassword);

module.exports = router