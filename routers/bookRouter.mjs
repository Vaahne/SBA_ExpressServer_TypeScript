import express from 'express';
import booksController from '../controllers/booksController.mjs';
import validateTitle from "../middleware/validateBookTitle.mjs";

const router = express.Router();

router.route('/').get(booksController.allbooks)
                .post(validateTitle,booksController.addBook);

router.route('/:id').get(booksController.specificBook)
                    .patch(booksController.updateBook)
                    .delete(booksController.deleteBook);
export default router;