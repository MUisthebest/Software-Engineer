const express = require('express');
const router = express.Router()

const {getSingleUser, updateUserPassword} = require('../controller/usersController')
const authMiddleware = require('../middleware/authentication')

router.route('/user/:id').get(authMiddleware,getSingleUser);
router.route('/user/changePassword').patch(authMiddleware, updateUserPassword);

module.exports = router