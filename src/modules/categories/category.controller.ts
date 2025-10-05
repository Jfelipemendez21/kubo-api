import { NextFunction, Request, Response } from 'express';
import { categoryService } from './category.service';
import { CreateCategoryDto } from './category.types';

export const categoryController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await categoryService.getAll();
      res.json({ success: true, content: users });
    } catch (error) {
      next(error)
    }
  },

  async create(req: Request<{}, {}, CreateCategoryDto>, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const newUser = await categoryService.create(data);
      res.status(201).json({ success: true, content: newUser });
    } catch (error) {
      next(error)
    }
  },
};
