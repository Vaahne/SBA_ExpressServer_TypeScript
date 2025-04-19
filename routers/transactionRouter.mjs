import express from 'express';
import transactionController from '../controllers/transactionController.mjs';

const router = express.Router();

 router.route('/').get(transactionController.allTransactions)
                  .post(transactionController.borrowOrReturn);

export default router;

