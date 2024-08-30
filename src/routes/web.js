const express = require('express');
const router = express.Router();
const { 
    getHomePage, 
    getTrendding, 
    getBoxItem, 
    getAdmin, 
    getAdminProduct, 
    getAdminUser, 
    getAdminOrder, 
    getContact
} = require("../controller/routeController");
const {createWishlist, removeItemFromWishlist, getWishlist} = require('../controller/wishlistController')

const dotenv = require('dotenv');



router.get('/', getHomePage);

router.get('/Trending', getTrendding);


router.get('/boxItem', getBoxItem);

router.get('/Admin', getAdmin);

router.post('Admin/', getAdmin);

router.get('/User_Admin', getAdminUser);

router.get('/Product_Admin', getAdminProduct);

router.get('/Contact', getContact);

module.exports = router;