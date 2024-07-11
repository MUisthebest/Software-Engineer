const express = require('express');
const router = express.Router();
const { 
    getHomePage, 
    getShopFreePage, 
    getShopBuyPage, 
    getLovePage, 
    getTrendingPage, 
    getCart, 
    getBoxItem, 
    getAdmin, 
    getAdminProduct, 
    getAdminUser, 
    getAdminOrder, 
} = require("../controller/routeController");
const dotenv = require('dotenv');



router.get('/', getHomePage);

router.get('/Trending', getTrendingPage);

router.get('/Love', getLovePage);

router.get('/Cart', getCart);

router.get('/boxItem', getBoxItem);

router.get('/Contact', getAdmin);

router.post('Admin/', getAdmin);

router.get('/User_Admin', getAdminUser);

router.get('/Product_Admin', getAdminProduct);

router.get('/Order-Admin', getAdminOrder);

module.exports = router;