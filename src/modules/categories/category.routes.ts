import { Router } from 'express';
import { categoryController } from './category.controller';
import { validate } from '../../middlewares/validationDtos';
import { createCategorySchema } from './category.types';

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', validate(createCategorySchema), categoryController.create);

export default router;