import express from 'express';
// import {body,validationResult} from 'express-validator';
import booksController from '../controllers/booksController';
import validateTitle from "../middleware/validateBookTitle";

const router = express.Router();

router.route('/').get(booksController.allbooks)
                .post(validateTitle,booksController.addBook);

router.route('/:id').get(booksController.specificBook)
                    .patch(booksController.updateBook)
                    .delete(booksController.deleteBook);
export default router;