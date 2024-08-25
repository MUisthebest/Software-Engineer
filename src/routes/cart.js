const express = require('express');
const router = express.Router()
const authMiddleware = require('../middleware/authentication')

const {createCart, getCart, removeItemFromCart} = require('../controller/cartController')

router.route('/cart').post(authMiddleware, createCart).get(authMiddleware, getCart).patch(authMiddleware, removeItemFromCart);


const {createWishlist, removeItemFromWishlist, getWishlist} = require('../controller/wishlistController')

router.route('/Love').post(authMiddleware, createWishlist).get(authMiddleware, getWishlist).patch(authMiddleware, removeItemFromWishlist);

module.exports = router
