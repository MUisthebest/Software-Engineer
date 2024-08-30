const express = require('express');
const router = express.Router();
const {authenticationMiddleware} = require('../middleware/authentication')

const {createWishlist, removeItemFromWishlist, getWishlist} = require('../controller/wishlistController')

router.route('/Love')
.post(authenticationMiddleware, createWishlist)
.get(authenticationMiddleware, getWishlist)
.patch(authenticationMiddleware, removeItemFromWishlist);

module.exports = router