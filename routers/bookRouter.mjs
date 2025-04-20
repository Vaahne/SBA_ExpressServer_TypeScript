import express from 'express';
import {body,validationResult} from 'express-validator';
import booksController from '../controllers/booksController.mjs';
import validateTitle from "../middleware/validateBookTitle.mjs";

const router = express.Router();

router.route('/').get(booksController.allbooks)
                .post(body('title').notEmpty().withMessage(`Title is required`),booksController.addBook);

router.route('/:id').get(booksController.specificBook)
                    .patch(booksController.updateBook)
                    .delete(booksController.deleteBook);
export default router;