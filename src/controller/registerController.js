const express = require('express');
const router = express.Router();
const users = require("../model/users")

router.get("/Register", function (req, res) {

    var username = req.query.username;
    var password = req.query.password;

    console.log(req.query)

    // Check if the user has filled in all fields
    if (!username || !password) {
        return res.json({ message: "Please fill in all fields, username and password is required!" })
    }

    const newUser = new users({
        Username: username,
        Password: password
    })

    if (users.findOne({ username }).exec()) {
        console.log("User already exists")
        return res.json({ message: "User already exists" })
    }

    try {
        newUser.save();
        console.log(newUser)
        res.json({ message: "User created successfully!" })
        console.log("User created successfully!")
    } catch (error) {
        res.json({ message: "Something wrong" })
        console.log(error)
    }
});

module.exports = router

