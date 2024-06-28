// const { MongoClient } = require('mongodb');

// // async function connectToMongo() {
// //     const uri = process.env.MONGODB_URI;
// //     const client = new MongoClient(uri);

// //     try {
// //         await client.connect();
// //         console.log("Connected to MongoDB");
// //     } catch (error) {
// //         console.error("Could not connect to MongoDB", error);
// //     }
// // }

// var collection = {};
// var client;

// async function connectToMongo() {
//     const uri = process.env.MONGODB_URI;
//     client = new MongoClient(uri);

//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//         collection["users"] = client.db("EcommerceData").collection("users");
//         collection["products"] = client.db("EcommerceData").collection("products");
//         collection["orders"] = client.db("EcommerceData").collection("orders");
//         collection["cart"] = client.db("EcommerceData").collection("cart");
//     } catch (error) {
//         console.error("Could not connect to MongoDB", error);
//     }
// }

// async function getDb(name) {
//     if (!collection[name]) {
//         throw new Error(`Collection ${name} is not initialized`);
//     }
//     return collection[name];
// }

// // async function closeMongoConnection() {
// //     if (client) {
// //         await client.close();
// //         console.log("MongoDB connection closed");
// //     }
// // }

// module.exports = { connectToMongo, getDb };

