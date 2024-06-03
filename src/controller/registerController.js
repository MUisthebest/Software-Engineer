const { MongoClient } = require('mongodb');
const {getDb} = require('../configs/mongo');
const express = require('express');

async function registerController(res, user) {
    const users = await getDb("users");

    console.log("Registering user");
    console.log(user);

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


