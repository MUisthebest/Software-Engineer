const express = require('express');
const router = express.Router();
const { getHomePage, getAboutWeb, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage } = require("../controller/menuController");

router.get('/', getHomePage);

router.get('/AboutWebsite', getAboutWeb);

router.get('/Trending', getTrendingPage);

router.get('/Love', getLovePage);

router.get('/Free', getShopFreePage);

router.get('/Buy', getShopBuyPage);




module.exports = router;