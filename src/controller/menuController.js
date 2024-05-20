const getHomePage = (req, res) => {
    res.render("Homepage.ejs");
}

const getAboutWeb = (req, res) =>{
    res.render("AboutWebsitepage.ejs");
}

const getShopFreePage = (req, res) =>{
    res.render("Freepage.ejs");
}

const getShopBuyPage = (req, res) =>{
    res.render("Buypage.ejs");
}

const getLovePage = (req, res) =>{
    res.render("Lovepage.ejs");
}

const getTrendingPage = (req, res) =>{
    res.render("Trendingpage.ejs");
}




module.exports = {
    getHomePage, getAboutWeb, getShopFreePage, getShopBuyPage, getLovePage, getTrendingPage
}