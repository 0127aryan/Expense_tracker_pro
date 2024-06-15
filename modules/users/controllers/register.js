const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const register = async(req, res) => {

    const usersModel = mongoose.model("users");

const {email, password, confirm_password, name, balance} = req.body;

//validations..

if(!email) throw "Email must be provided";
if(!password) throw "Password must be provided";
if(password.length<5) throw "Password must be atleat 5 characters long";
if(!name) throw "name is required";
if(password!==confirm_password) throw "Password and confirmed password does not match";

const getDuplicateEmail = await usersModel.findOne({
    email: email,
});
if(getDuplicateEmail) throw "This email already exists!";

const hashedPassword = await bcrypt.hash(password, 12);

await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
})








res.status(201).json({
    status:"User registered Successfully",
});


};

module.exports = register;