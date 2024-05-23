const express = require('express');
const path = require('path');
const configViewEngine = require('./configs/viewEngine');
const webRoutes = require('./router/web');
require('dotenv').config();
const mongoose = require('mongoose');
const { error } = require('console');

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb+srv://<user>:<passsword>@sewebapp.xbv0lcv.mongodb.net/EcommerceData") //MongoDB URI
.then(
    () => console.log("Connect to MongoDB")
).catch(
    error => console.error("Could not connect to MongoDB", error)
)

console.log('check',port);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


configViewEngine(app);

app.use('/', webRoutes);

app.listen(port, ()=>
{
    console.log('Example app listening on port ' + port);
})