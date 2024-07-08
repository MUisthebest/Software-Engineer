const fs = require("node:fs");
const ejs = require('ejs');
const Product = require('../models/Product')


var listOfItems = [];
const getHomePage = (req, res) => {

    res.render("Layout.ejs",{filename: "Homepage.ejs"});
}


const getShopFreePage = (req, res) =>{
    res.render("Layout.ejs", {filename: "Freepage.ejs"});
}

// const getShopBuyPage = (req, res) =>{
//     res.render("Layout.ejs",{filename: "Buypage.ejs"});
// }

const getLovePage = (req, res) =>{
    res.render("Layout.ejs", {filename: "Lovepage.ejs"});
}


const getLogin = (req, res) =>{
    res.render("Layout.ejs",{filename: "Login.ejs"});
}

const getCart = (req, res) =>{
    res.render("Layout.ejs",{filename: "Cartpage.ejs"});
}

const getRegister =(req, res) =>{
    res.render("Layout.ejs",{filename: "Register.ejs"});
}

const getTrendingPage = async(req,res) =>{
    const products = await Product.find({}).sort('createdAt')
    res.render("Layout.ejs", {filename: "Trendingpage.ejs", products: products});
}

const getBoxItem = (req, res) =>{
    res.render("Layout.ejs",{filename: "boxItem.ejs"});
}

const getAdmin= (req, res) =>{
    res.render("Admin.ejs",{filename: "User-Admin.ejs"});
}

const getAdminUser = (req, res) =>{
    res.render("Admin.ejs",{filename: "User-Admin.ejs"});
}

const getAdminProduct = (req, res) =>{
    res.render("Admin.ejs",{filename: "Product-Admin.ejs"});
}

const getAdminOrder = (req, res) =>{
    res.render("Admin.ejs",{filename: "Order-Admin.ejs"});
}

// const displayDatabase = (req, res) =>{
//     res.render("Database.ejs",{listItems: listOfItems});
// }

const getUser = (req, res) =>{
    res.render("Layout.ejs",{filename: "User.ejs"});
}


module.exports = {
    getHomePage, 
    getShopFreePage, 
    // getShopBuyPage, 
    getLovePage, 
    getLogin, 
    getCart, 
    getRegister, 
    getBoxItem, 
    getAdmin, 
    getAdminProduct, 
    getAdminUser, 
    getAdminOrder,
    getTrendingPage,
    getUser
}