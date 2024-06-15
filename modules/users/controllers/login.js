const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const login = async (req, res) => {

    const usersModel = mongoose.model("users");

    const {email, password} = req.body

    const getUser = await usersModel.findOne({
        email: email,
    });

    if(!getUser) throw " this email does not exist in the system";

    const comparePassword = await bcrypt.compare(password, getUser.password);

    if(!comparePassword) throw " Email Password do not match";

   // console.log(getUser);


    //success response
    res.status(200).json({
        status: "success",
        message: "User Logged in successfully",
    });

};

module.exports = login;