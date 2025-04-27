import express from 'express';
import booksTemplateController from '../controllers/booksTemplateController';
import usersTemplateController from '../controllers/usersTemplateController';

const router = express.Router();

router.get('/booksView', booksTemplateController.booksTemplate);
router.get('/usersView',usersTemplateController.userTemplate);

export default router;