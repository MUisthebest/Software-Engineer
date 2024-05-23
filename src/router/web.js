const express = require('express');
const router = express.Router();
const { getHomePage, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage, getLogin, getCart, getRegister } = require("../controller/menuController");
const users = require("../model/users")


router.get('/', getHomePage);

router.get('/Trending', getTrendingPage);

router.get('/Love', getLovePage);

router.get('/Free', getShopFreePage);

router.get('/Buy', getShopBuyPage);

router.get('/Login', getLogin);

router.get('/Cart', getCart);

router.get('/Register', getRegister);

router.get("/create_user", function (req, res) {

    var username = req.query.username;
    var password = req.query.password;

    if (!username || !password) {
        return res.json({ message: "Please fill in all fields, username and password is required!" })
    }

    if (users.exists({ 'username': username })) {
        console.log("User already exists")
        return res.json({ message: "User already exists" })
    }

    const newUser = new users({
        username: username,
        password: password,
        address: req.query.address
    })

    try {
        newUser.save();
        console.log(newUser)
        res.json({ message: "User created successfully!" })
        console.log("User created successfully!")
    } catch (error) {
        res.json({ message: "Something wrong" })
        console.log(error)
    }
});


module.exports = router;