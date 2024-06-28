// controller/loginController.js
const { MongoClient } = require('mongodb');
const { getDb } = require('../configs/mongo');

async function loginController(res, user) {
    const users = await getDb("users");

    console.log("Logging in user");
    console.log(user);

    try {
        const existingUser = await users.findOne({ username: user.username });

        if (!existingUser) {
            console.log("User not found");
            return res.json({ message: "User not found" });
        }

        if (existingUser.password !== user.password) {
            console.log("Incorrect password");
            return res.json({ message: "Incorrect password" });
        }

        console.log("User logged in successfully!");
        res.json({ message: "User logged in successfully!" });
    } catch (error) {
        res.json({ message: "Something went wrong" });
        console.log(error);
    }
}

module.exports = { loginController };


