const { MongoClient } = require('mongodb');
const {getDb} = require('../configs/mongo');

async function registerController(req, res) {
    const user = {
        name: "Daenerys Targaryen",
        username: "dany",
        password: "dracarys",
        address: {
            street: "Dragonstone",
            district: "Crownlands",
            city: "Valyria",
            country: "Westeros"
        },
        role: {
            Admin: false,
            Customer: true
        }
    }

    const users = await getDb("users");

    if (await users.findOne({ username: user.username })) {
        console.log("User already exists");
        return res.json({ message: "User already exists" });
    }

    try {
        await users.insertOne(user);
        console.log(user);
        res.json({ message: "User created successfully!" });
        console.log("User created successfully!");
    } catch (error) {
        res.json({ message: "Something wrong" });
        console.log(error);
    }
}



module.exports = { registerController }


