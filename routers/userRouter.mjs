import express from 'express';
import usersController from '../controllers/userController.mjs';

const router = express.Router();

router.route('/').get(usersController.allUsers)
                 .post(usersController.addUser);

router.route('/:id').get(usersController.specificUser)
                          .patch(usersController.updateUser)
                          .delete(usersController.deleteUser);

export default router;