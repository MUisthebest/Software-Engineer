const express = require('express');
const router = express.Router();
const {register, login, logout, dashboard} = require('../controller/authController')
const {authenticationMiddleware} = require('../middleware/authentication')


const {
    getLogin, getRegister
} = require('../controller/routeController')

router.route('/login').get(getLogin).post(login)
router.route('/register').get(getRegister).post(register)
router.route('/dashboard').get(authenticationMiddleware, dashboard)
router.route('/logout').get(logout)

module.exports = router