"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_1 = __importDefault(require("../data/transactions"));
// returns or gets all transactions
function allTransactions(req, res) {
    const { transaction_id } = req.query;
    if (transaction_id) {
        const transaction = transactions_1.default.find((t) => t.transaction_id == Number(transaction_id));
        if (transaction)
            res.json(transaction);
        else
            res.status(404).json("Transaction not found");
        return;
    }
    res.json(transactions_1.default);
    return;
}
// updates/patches a transaction based on the transaction_Id
function borrowOrReturn(req, res) {
    const transaction_id = req.params.id;
    const reqType = req.body.type;
    if (!transaction_id) {
        res.status(400).json(`Empty Transaction id`);
        return;
    }
    const transaction = transactions_1.default.find((t) => t.transaction_id == Number(transaction_id));
    if (!transaction) {
        res.status(404).json("Invalid transaction Id");
        return;
    }
    if (transaction.type == reqType) {
        res.status(400).json(`Book is already in ${reqType}ed. Cannot ${reqType} again `);
        return;
    }
    transaction.type = reqType;
    res.json({
        message: "Transaction successfully updated",
        transaction: transaction
    });
    return;
}
// gets a transaction by transaction_id
function searchTransaction(req, res) {
    const transaction_id = req.params.id;
    if (!transaction_id) {
        res.status(400).json(`Empty Transaction id`);
        return;
    }
    const transaction = transactions_1.default.find((t) => t.transaction_id == Number(transaction_id));
    if (transaction)
        res.json(transaction);
    else
        res.status(404).json("Transaction not found");
    return;
}
exports.default = { allTransactions, borrowOrReturn, searchTransaction };
