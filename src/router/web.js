const express = require('express');
const router = express.Router();
const { getHomePage, getAboutWeb} = require("../controller/menuController");

router.get('/', getHomePage);

router.get('/AboutWebsite', getHomePage);


module.exports = router;