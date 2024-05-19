const getHomePage = (req, res) => {
    res.render("Homepage.ejs");
}

const getAboutWeb = (req, res) =>{
    res.render("AboutWebsitepage.ejs");
}


module.exports = {
    getHomePage, getAboutWeb
}