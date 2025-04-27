import express from 'express';
import transactionController from '../controllers/transactionController';
import validateType from '../middleware/validateTransaction';

const router = express.Router();

router.route('/').get(transactionController.allTransactions)
                  .post(transactionController.borrowOrReturn);

router.route('/:id').get(transactionController.searchTransaction)
                    .patch(validateType,transactionController.borrowOrReturn);                  

export default router;

