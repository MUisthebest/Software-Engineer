// const { MongoClient } = require('mongodb');
// const {getDb} = require('../configs/mongo');
// const express = require('express');

// async function registerController(res, user) {
//     const users = await getDb("users");

//     console.log("Registering user");
//     console.log(user);

//     if (await users.findOne({ username: user.username })) {
//         console.log("User already exists");
//         return res.json({ message: "User already exists" });
//     }

//     try {
//         await users.insertOne(user);
//         console.log(user);
//         res.json({ message: "User created successfully!" });
//         console.log("User created successfully!");
//     } catch (error) {
//         res.json({ message: "Something wrong" });
//         console.log(error);
//     }
// }

// module.exports = { registerController }


const User = require('../models/User');

const createSingleUser = async(req,res)=>{
    try {
        const {username:usr} = req.params
        const existed = await User.findOne({username:usr})
        if (!existed){
            const user = await User.create(req.body);
            res.status(200).json(user);
        }
        else {
            res.status(400).json({msg:'User is already existed'})
        }
        
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {createSingleUser, getAllUsers};