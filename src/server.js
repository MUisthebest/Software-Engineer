require('express-async-errors')
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const configViewEngine = require('./configs/viewEngine');

// const mongoose = require('mongoose');
const { error } = require('console');
// const {connectToMongo} = require('./configs/mongo');
const connectDB = require('./db/connect')

// routes
const webRoutes = require('./routes/web');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products')

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



app.use('/', webRoutes);
app.use('/', authRouter);
app.use('/', productsRouter);

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