const express = require('express');
const router = express.Router();
const { getHomePage, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage, getLogin, getCart } = require("../controller/menuController");

router.get('/', getHomePage);


router.get('/Trending', getTrendingPage);

router.get('/Love', getLovePage);

router.get('/Free', getShopFreePage);

router.get('/Buy', getShopBuyPage);

router.get('/Login', getLogin);

router.get('/Cart',getCart);




module.exports = router;