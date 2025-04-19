import express from 'express';
import booksTemplateController from '../controllers/booksTemplateController.mjs';
import usersTemplateController from '../controllers/usersTemplateController.mjs';

const router = express.Router();

router.get('/booksView', booksTemplateController.booksTemplate);

router.get('/usersView',usersTemplateController.userTemplate);

export default router;