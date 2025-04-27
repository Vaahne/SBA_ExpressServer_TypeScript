import transactions from "../data/transactions";
import { Request,Response } from 'express';


interface Transaction{
    transaction_id : number;
    userId: number;
    bookId: number;
    type: string;
}
// returns or gets all transactions
function allTransactions(req:Request,res:Response):void{
    const {transaction_id} =req.query;
    
    if(transaction_id){
        const transaction = transactions.find((t:Transaction)=> t.transaction_id == Number(transaction_id));
        if(transaction)
             res.json(transaction);
        else
            res.status(404).json("Transaction not found");
        return;
    }
     res.json(transactions);
     return;
}
// updates/patches a transaction based on the transaction_Id
function borrowOrReturn(req:Request,res:Response):void{
    const transaction_id = req.params.id;
    const reqType = req.body.type;

    if(!transaction_id){
         res.status(400).json(`Empty Transaction id`);
        return
    }

    const transaction = transactions.find((t:Transaction)=> t.transaction_id == Number(transaction_id));

    if(!transaction){
        res.status(404).json("Invalid transaction Id");
        return;
    }

    if(transaction.type == reqType){
        res.status(400).json(`Book is already in ${reqType}ed. Cannot ${reqType} again `);
        return;
    }

    transaction.type = reqType;
    
    res.json({ 
        message: "Transaction successfully updated",
        transaction:   transaction
    });
    return;
}

// gets a transaction by transaction_id
function searchTransaction(req:Request,res:Response):void{
    const transaction_id = req.params.id;

    if(!transaction_id){
        res.status(400).json(`Empty Transaction id`);
        return;
    }

    const transaction = transactions.find((t:Transaction)=> t.transaction_id == Number(transaction_id));
    if(transaction)
         res.json(transaction);
    else
        res.status(404).json("Transaction not found");
    return;
}

export default {allTransactions,borrowOrReturn, searchTransaction};