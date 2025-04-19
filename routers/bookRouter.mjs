import express from 'express';
import booksController from '../controllers/booksController.mjs';

const router = express.Router();

router.route('/').get(booksController.allbooks)
                .post(booksController.addBook);

router.route('/:id').get(booksController.specificBook)
                    .patch(booksController.updateBook)
                    .delete(booksController.deleteBook);
export default router;