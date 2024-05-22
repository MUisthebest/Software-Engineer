const fs = require("node:fs");
const ejs = require('ejs');
const getHomePage = (req, res) => {

    res.render("Layout.ejs",{filename: "Homepage.ejs"});
}


const getShopFreePage = (req, res) =>{
    res.render("Layout.ejs", {filename: "Freepage.ejs"});
}

const getShopBuyPage = (req, res) =>{
    res.render("Layout.ejs",{filename: "Buypage.ejs"});
}

const getLovePage = (req, res) =>{
    res.render("Layout.ejs",{filename: "Lovepage.ejs"});
}

const getTrendingPage = (req, res) =>{
    res.render("Layout.ejs", {filename: "Trendingpage.ejs"});
}


const getLogin = (req, res) =>{
    res.render("Layout.ejs",{filename: "Login.ejs"});
}

const getCart = (req, res) =>{
    res.render("Layout.ejs",{filename: "Cartpage.ejs"});
}


module.exports = {
    getHomePage, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage, getLogin, getCart
}