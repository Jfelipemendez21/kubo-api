import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/apiError';
import { moviesService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.types';

export const moviesController = {
    
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
        let filters: { [key: string]: any } = {}

        if(req.query.title as string) filters.title = req.query.title
        if(req.query.category as string) filters.category = req.query.category
        if(Number(req.query.page)) filters.page= Number(req.query.page)
        if(Number(req.query.limit)) filters.limit= Number(req.query.limit)
        if(typeof req.query.orderBy === "string" && req.query.orderBy == "premiereDate") filters.orderBy = req.query.orderBy

        const movies = await moviesService.findAll(filters);

        res.json({
        success: true,
        data: movies,
        });

    } catch (error) {
        next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if(!Number(id)){
        throw new ApiError(409, "The id should be a number")
      }
      const movie = await moviesService.getById(Number(id));
      
      if (!movie) {
        throw new ApiError(404, "Movie not found")
      }

      res.json({
        success: true,
        data: movie,
      });
    } catch (error) {
      next(error);
    }
  },

  async getNewsMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await moviesService.getNewsMovies();
      res.json({
        success: true,
        data: movies,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request<{}, {}, CreateMovieDto>, res: Response, next: NextFunction) {
    try {
      const movie = await moviesService.create(req.body);
      res.status(201).json({
        success: true,
        data: movie,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request<{ id: string }, {}, UpdateMovieDto>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const movie = await moviesService.update(Number(id), req.body);
      res.json({
        success: true,
        data: movie,
      });
    } catch (error) {
      next(error);
    }
  },
}