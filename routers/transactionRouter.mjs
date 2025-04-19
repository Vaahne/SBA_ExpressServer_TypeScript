import express from 'express';
import transactionController from '../controllers/transactionController.mjs';

const router = express.Router();

router.route('/').get(transactionController.allTransactions)
                  .post(transactionController.borrowOrReturn);

router.route('/:id').get(transactionController.searchTransaction)
                    .patch(transactionController.borrowOrReturn);                  

export default router;

