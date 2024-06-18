const mongoose = require("mongoose");

const deleteTransaction = async (req, res) => {
    const transactionModel = mongoose.model("transactions");
    const {transaction_id} = req.params;

    const getTransactions = await transactionModel.findOne({
        _id: transaction_id
    });
    if(!getTransactions) throw "Transaction not found";

    res.status(200).json({
        status: "deleted successfully",
    });
};

module.exports = deleteTransaction;