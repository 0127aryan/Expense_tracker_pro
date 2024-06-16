const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken")


const login = async (req, res) => {

    const usersModel = mongoose.model("users");

    const {email, password} = req.body

    const getUser = await usersModel.findOne({
        email: email,
    });

    if(!getUser) throw " this email does not exist in the system";

    const comparePassword = await bcrypt.compare(password, getUser.password);

    if(!comparePassword) throw " Email Password do not match";

   const accessToken = await jsonwebtoken.sign({
    _id: getUser._id,
    name: getUser.name,
}, 
process.env.jwt_salt
);


    //success response
    res.status(200).json({
        status: "success",
        message: "User Logged in successfully",
        accessToken: accessToken,
    });

};

module.exports = login;