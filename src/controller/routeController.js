const fs = require("node:fs");
const ejs = require('ejs');
const Product = require('../models/Product')
const User = require('../models/User')


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

const getContact = (req, res) =>{
    res.render("Layout.ejs", {filename: "Contact.ejs"});
}


const getLogin = (req, res) =>{
    res.clearCookie('user');
    res.render("Layout.ejs",{filename: "Login.ejs"});
}

const getCart = (req, res) =>{
    res.render("Layout.ejs",{filename: "Cartpage.ejs"});
}

const getRegister =(req, res) =>{
    res.render("Layout.ejs",{filename: "Register.ejs"});
}

const getLovePage = async(req,res) =>{
    const products = await Product.find({}).sort('createdAt')
    res.render("Layout.ejs", {filename: "Lovepage.ejs", products: products});
}

const getBoxItem = (req, res) =>{
    res.render("Layout.ejs",{filename: "boxItem.ejs"});
}

const getAdmin= async(req, res) =>{
    try {
        const users = await User.find({});
        res.render("Admin.ejs", { filename: "User-Admin.ejs", users: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getAdminUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.render("Admin.ejs", { filename: "User-Admin.ejs", users: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAdminProduct = async(req, res) =>{
    const products = await Product.find({}).sort('createdAt')
    res.render("Admin.ejs",{filename: "Product-Admin.ejs", products: products});
}

const getAdminOrder = (req, res) =>{
    res.render("Admin.ejs",{filename: "Order-Admin.ejs"});
}

// const displayDatabase = (req, res) =>{
//     res.render("Database.ejs",{listItems: listOfItems});
// }

const getUser = async(req, res) =>{
    const products = await Product.find({}).sort('createdAt')
    res.render("Layout.ejs",{filename: "User.ejs", products:products});
}

const getSearch = async(req, res) =>{
    res.render("Layout.ejs",{ filename: "resultSearch.ejs"});
}

const getTrendding = async(req, res) =>{
    const products = await Product.find({}).sort('createdAt')
    res.render("Layout.ejs",{ filename: "Trendingpage.ejs", products:products});
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
    getTrendding,
    getUser,
    getSearch,
    getContact
}