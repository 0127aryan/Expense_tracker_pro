const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailmanager = require("../../../managers/emailmanager");

const resetPassword = async (req, res) => {

    const usersModel = mongoose.model("users");

    const {email, new_password, reset_code} = req.body;

    if(!email) throw "email is required";
    if(!new_password) throw "Please provide new password";
    if(!reset_code) throw "please provide reset code";
    if(new_password.length<5) throw "password must be 5 characters long";


    const getUserWithresetCode = await usersModel.findOne({
        email:email,
        reset_code: reset_code
    })
    if(!getUserWithresetCode) throw "reset code does not match";
    const hashedPassword = await bcrypt.hash(new_password, 12);

    await usersModel.updateOne({
        email:email,
        },{
    password: hashedPassword,
    reset_code: "",
},{
    runValidators: true,
}
);
await emailmanager(email, "Your password is reset successfully. If you have not rest the password please contact us!","Your password is reset successfully. If you have not rest the password please contact us!", "Password reset successfully" );

    res.status(200).json({
        status: "Success",
        message: "password reseted successfully",
    })


}

module.exports = resetPassword