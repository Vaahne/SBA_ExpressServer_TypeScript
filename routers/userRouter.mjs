import express from 'express';
import usersController from '../controllers/userController.mjs';

const router = express.Router();

router.get('/',usersController.allUsers)

router.route('/:id').get(usersController.specificUser)
                          .post(usersController.addUser)
                          .patch(usersController.updateUser)
                          .delete(usersController.deleteUser);

export default router;