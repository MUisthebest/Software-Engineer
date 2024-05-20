const express = require('express');
const router = express.Router();
const { getHomePage, getAboutWeb, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage, getLogin } = require("../controller/menuController");

router.get('/', getHomePage);

router.get('/AboutWebsite', getAboutWeb);

router.get('/Trending', getTrendingPage);

router.get('/Love', getLovePage);

router.get('/Free', getShopFreePage);

router.get('/Buy', getShopBuyPage);

router.get('/Login', getLogin);




module.exports = router;