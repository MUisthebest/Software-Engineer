const express = require('express');
const router = express.Router();

const {register, login} = require('../controller/authController')

const {
    getLogin, getRegister
} = require('../controller/routeController')

router.route('/login').get(getLogin).post(login)
router.route('/register').get(getRegister).post(register)

module.exports = router