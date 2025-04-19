import transactions from "../data/transaction.mjs";

function allTransactions(req,res){
    return res.json(transactions);
}

function borrowOrReturn(){
    
}

function searchTransaction(){

}

export default {allTransactions,borrowOrReturn, searchTransaction};