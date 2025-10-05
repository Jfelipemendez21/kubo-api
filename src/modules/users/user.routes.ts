import { Router } from 'express';
import { validate } from '../../middlewares/validationDtos';
import { userController } from './user.controller';
import { createUserSchema } from './user.types';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', validate(createUserSchema) ,userController.create);
router.post('/:userId/movies/:movieId/watched', userController.markWatched);

export default router;
