import express from 'express';
import booksController from '../controllers/booksController.mjs';

const router = express.Router();

router.get('/',booksController.allbooks)

router.route('/:id').get(booksController.specificBook)
                          .post(booksController.addBook)
                          .patch(booksController.updateBook)
                          .delete(booksController.deleteBook);

export default router;