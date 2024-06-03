const express = require('express');
const router = express.Router();
const { getHomePage, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage, getLogin, getCart, getRegister, getBoxItem, getAdmin } = require("../controller/menuController");
const { registerController } = require("../controller/registerController");
const dotenv = require('dotenv');

router.get('/', getHomePage);

router.get('/Trending', getTrendingPage);

router.get('/Love', getLovePage);

router.get('/Buy', getShopBuyPage);

router.get('/Login', getLogin);

router.get('/Cart', getCart);

router.get('/Register', getRegister);

router.get('/boxItem', getBoxItem);

router.get('/Contact', getAdmin);

router.post('Admin/',getAdmin);

router.get("/users", (req, res) => {
    var username = req.query.username;
    var password = req.query.password;

    if (!username || !password) {
        return res.json({ message: "Please fill in all fields, username and password is required!" });
    }

    registerController(req, res);
})


module.exports = router;