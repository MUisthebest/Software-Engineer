const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {createWishlist, removeItemFromWishlist, getWishlist} = require('../controller/wishlistController')

router.route('/Love').post(authMiddleware, createWishlist).get(authMiddleware, getWishlist).patch(authMiddleware, removeItemFromWishlist);

module.exports = router