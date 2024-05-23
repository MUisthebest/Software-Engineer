const fs = require("node:fs");
const ejs = require('ejs');
var listOfItems = [];
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
    res.render("Lovepage.ejs",{listItems: listOfItems});
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

const getRegister =(req, res) =>{
    res.render("Layout.ejs",{filename: "Register.ejs"});
}

const createUser = (req,res) =>{
    var data = {
        nameUser: req.body.nameUser,
        passwordUser: req.body.passwordUser,
        addressUser: req.body.addressUser
    };
    listOfItems.push(data);
    console.log("p: ", listOfItems);   
    res.send('create user!');
}

// const displayDatabase = (req, res) =>{
//     res.render("Database.ejs",{listItems: listOfItems});
// }



module.exports = {
    getHomePage, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage, getLogin, getCart, getRegister, createUser
}