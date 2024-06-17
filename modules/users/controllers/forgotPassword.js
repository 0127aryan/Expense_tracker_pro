const mongoose = require("mongoose");
const emailmanager = require("../../../managers/emailmanager");

const forgotPassword = async (req, res) => {

    const usersModel = mongoose.model("users");

    const {email} = req.body;
    if(!email) throw "email is required";

    const getUser = await usersModel.findOne({
        email: email,
    })

    if(!getUser) throw "This email does not exist in the system";

    const reset_code = Math.floor(10000 + Math.random() * 90000);

    await usersModel.updateOne({
        email: email,
    },
    {
        reset_code: reset_code
    },{
    runValidators: true,
}
);
await emailmanager(email,"Your Password reset code is " + reset_code, "Your Password reset code is " + reset_code,"Reset your password - Expense tracker pro" )


res.status(200).json({
    status:"Reset code sent to email successfully",
})

};

module.exports = forgotPassword;