import { Router } from 'express';
import { moviesController } from './movie.controller';
import { validate } from '../../middlewares/validationDtos';
import { createMovieSchema, updateMovieSchema } from './movie.types';

const router = Router();

router.get('/', moviesController.getAll);
router.get('/novedades/', moviesController.getNewsMovies);
router.get('/:id', moviesController.getById);
router.post('/', validate(createMovieSchema), moviesController.create);
router.patch('/:id', validate(updateMovieSchema), moviesController.update);

export default router;