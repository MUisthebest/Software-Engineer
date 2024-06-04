const express = require('express');
const router = express.Router();
const { getHomePage, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage, getLogin, getCart, getRegister, getBoxItem, getAdmin , getAdminProduct, getAdminUser, getAdminOrder } = require("../controller/menuController");
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

router.get('/User_Admin',getAdminUser);

router.get('/Product_Admin',getAdminProduct);


router.get('/Order-Admin', getAdminOrder);

router.get("/users", (req, res) => {
    var username = req.query.username;
    var password = req.query.password;

    if (!username || !password) {
        return res.json({ message: "Please fill in all fields, username and password is required!" });
    }

    var cityId = req.query.city;
    var districtId = req.query.district;
    var wardId = req.query.ward;

    const cityName = jsonData.find(city => city.Id === cityId).Name;

    const districtName = jsonData.find(city => city.Id === cityId)
        .Districts.find(district => district.Id === districtId).Name;

    const wardName = jsonData.find(city => city.Id === cityId)
        .Districts.find(district => district.Id === districtId)
        .Wards.find(ward => ward.Id === wardId).Name;

    var city = cityName;
    var district = districtName;
    var ward = wardName;


    var user = {
        // name: req.query.name,
        name: username,
        username: username,
        password: password,
        phone: req.query.phone,
        address: {
            ward: wardId,
            district: districtId,
            city: cityId,
            country: 'VietNam'
        },
        role: {
            Admin: false,
            Customer: true
        }
    }

    //convert utf8 of address to non utf8

    registerController(res, user);
})


module.exports = router;