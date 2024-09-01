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

router.route('/admin').get(authenticationMiddleware, authorizePermissions('admin'), getAdmin);

router.get('/admin/users-management', authenticationMiddleware, authorizePermissions('admin'), getAdminUser);

router.get('/admin/products-management', authenticationMiddleware, authorizePermissions('admin'), getAdminProduct);

router.get('/Contact', getContact);

module.exports = router;