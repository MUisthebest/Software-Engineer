require('express-async-errors')
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const configViewEngine = require('./configs/viewEngine');
const cookieParser = require('cookie-parser')

// const mongoose = require('mongoose');
const { error } = require('console');
// const {connectToMongo} = require('./configs/mongo');
const connectDB = require('./db/connect')

// routes
const webRoutes = require('./routes/web');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const wishlistRouter = require('./routes/wishlist');
const orderRouter = require('./routes/orders');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// //Using MongoClient to connect to MongoDB
// connectToMongo()

const port = process.env.PORT || 8080;

//Using Mongoose to connect to MongoDB
// mongoose.connect("mongodb+srv://admin:admin@sewebapp.xbv0lcv.mongodb.net/EcommerceData") //MongoDB URI
// .then(
//     () => console.log("Connect to MongoDB")
// ).catch(
//     error => console.error("Could not connect to MongoDB", error)
// )

// middleware
app.use(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));



app.use('/', 
    webRoutes, 
    authRouter, 
    productsRouter, 
    usersRouter, 
    cartRouter, 
    wishlistRouter, 
    orderRouter
);

configViewEngine(app);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const start = async()=>{
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`))
        
    } catch (error) {
        console.log(error);
    }
}

start()