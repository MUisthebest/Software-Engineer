const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/authentication')

const {createCart, getCart, removeItemFromCart} = require('../controller/cartController')

router.route('/cart').post(authMiddleware, createCart).get(authMiddleware, getCart).patch(authMiddleware, removeItemFromCart);

module.exports = router