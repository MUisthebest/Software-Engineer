const express = require('express');
const router = express.Router();
const { 
    getHomePage, 
    getShopFreePage, 
    getShopBuyPage, 
    getLovePage, 
    getTrendding, 
    getBoxItem, 
    getAdmin, 
    getAdminProduct, 
    getAdminUser, 
    getAdminOrder, 
    getSearch,
    getContact
} = require("../controller/routeController");
const dotenv = require('dotenv');



router.get('/', getHomePage);

router.get('/Trending', getTrendding);

router.get('/Love', getLovePage);

router.get('/boxItem', getBoxItem);

router.get('/Admin', getAdmin);

router.post('Admin/', getAdmin);

router.get('/User_Admin', getAdminUser);

router.get('/Product_Admin', getAdminProduct);

router.get('/Order-Admin', getAdminOrder);

router.get('/getSearch', getSearch);

router.get('/Contact', getContact);

module.exports = router;