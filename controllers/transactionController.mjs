import transactions from "../data/transactions.mjs";

function allTransactions(req,res){
    return res.json(transactions);
}

function borrowOrReturn(req,res){
    const transaction_id = req.params.id;
    const reqType = req.body.type;

    if(!transaction_id)
        return res.status(400).json(`Empty Transaction id`);

    if(!reqType || !['borrow','return'].includes(reqType))
        return res.status(404).json("Invalid type, it can be either borrow or return");

    const transaction = transactions.find((t)=> t.transaction_id == transaction_id);

    if(!transaction)
        return res.status(404).json("Invalid transaction Id");

    if(transaction.type == reqType)
        return res.status(400).json(`Book is already in ${reqType}ed. Cannot ${reqType} again `);

    transaction.type = reqType;
    
    return res.json({ 
        message: "Transaction successfully updated",
        transaction:   transaction
    });
}

function searchTransaction(req,res){
    const transaction_id = req.params.id;
    if(!transaction_id)
        return res.status(400).json(`Empty Transaction id`);

    const transaction = transactions.find((t)=> t.transaction_id == transaction_id);
    if(transaction)
        return res.json(transaction);
    return res.status(404).json("Transaction not found");
}

export default {allTransactions,borrowOrReturn, searchTransaction};