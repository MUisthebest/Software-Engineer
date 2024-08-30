const express = require('express');
const router = express.Router()
const {authenticationMiddleware} = require('../middleware/authentication')

const {createCart, getCart, removeItemFromCart, removeSingleCart} = require('../controller/cartController')

router.route('/cart')
.post(authenticationMiddleware, createCart)
.get(authenticationMiddleware, getCart)
.patch(authenticationMiddleware, removeItemFromCart)
.delete(authenticationMiddleware, removeSingleCart);

module.exports = router
