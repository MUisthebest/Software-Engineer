const express = require('express');
const router = express.Router();
const { 
    getHomePage, 
    getTrendding, 
    getAdmin, 
    getAdminProduct, 
    getAdminUser, 
    getAdminOrder, 
    getContact
} = require("../controller/routeController");
const {createWishlist, removeItemFromWishlist, getWishlist} = require('../controller/wishlistController')
const {authenticationMiddleware, authorizePermissions} = require('../middleware/authentication')

const dotenv = require('dotenv');



router.get('/', getHomePage);

router.get('/Trending', getTrendding);

router.route('/Admin').get(authenticationMiddleware, authorizePermissions('admin'), getAdmin);

router.get('/User_Admin', getAdminUser);

router.get('/Product_Admin', getAdminProduct);

router.get('/Order-Admin', getAdminOrder);

router.get('/Contact', getContact);

module.exports = router;