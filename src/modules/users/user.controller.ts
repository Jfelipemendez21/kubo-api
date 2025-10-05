import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../utils/apiError';
import { userService } from './user.service';
import { CreateUserDto } from './user.types';

export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.json({ success: true, content: users });
    } catch (error) {
      next(error)
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if(!Number(id)){
          throw new ApiError(400, "El id debe ser un numero")
        }
        const user = await userService.getById(Number(id));
        res.json({ success: true, content: user });
    } catch (error) {
        next(error)
    }
  },

  async create(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      const newUser = await userService.create({ name, email });
      res.status(201).json({ success: true, content: newUser });
    } catch (error) {
      next(error)
    }
  },

  async markWatched(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const movieId = Number(req.params.movieId);
      const watched = await userService.markMovieAsWatched(userId, movieId);
      res.json({ success: true, content: watched });
    } catch (error) {
      next(error)
    }
  }
};
