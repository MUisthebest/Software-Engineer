const express = require('express');
const path = require('path');
const configViewEngine = require('./configs/viewEngine');
const webRoutes = require('./router/web');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
console.log('check',port);

configViewEngine(app);

app.use('/', webRoutes);



app.listen(port, ()=>
{
    console.log('Example app listening on port ${port}');
})