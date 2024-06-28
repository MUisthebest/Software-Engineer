const express = require('express');
const router = express.Router();
const {register, login, dashboard} = require('../controller/authController')
const authMiddleware = require('../middleware/authentication')


const {
    getLogin, getRegister
} = require('../controller/routeController')

router.route('/login').get(getLogin).post(login)
router.route('/register').get(getRegister).post(register)
router.route('/dashboard').get(authMiddleware, dashboard)

module.exports = router