const express = require('express');
const path = require('path');
const configViewEngine = require('./configs/viewEngine');
const webRoutes = require('./router/web');
const mongoose = require('mongoose');
const { error } = require('console');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(/*process.env.MONGODB_URI ||*/ 'mongodb://localhost:27017/EcommerceData', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB', error));

    console.log('check', port);

configViewEngine(app);

app.use('/', webRoutes);


app.listen(port, () => {
    console.log('Example app listening on port ' + port);
})