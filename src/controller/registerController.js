// const users = require("../model/users")

// const handleRegister = (req, res) => {

//     console.log(req)
//     const { username, password } = req.body;

//     // Check if the user has filled in all fields
//     if (!username || !password) {
//         return res.json({ message: "Please fill in all fields, username and password is required!" })
//     }

//     const newUser = new users({
//         Username: username,
//         Password: password
//     })

//     if (users.findOne({ username }).exec()) {
//         return res.json({ message: "User already exists" })
//     }

//     try {
//         users.create(newUser);
//         console.log(newUser)
//         res.json({ message: "User created successfully!" })
//         console.log("User created successfully!")
//     } catch (error) {
//         res.json({ message: "Something wrong" })
//         console.log(error)
//     }
// }

// module.exports = { handleRegister }