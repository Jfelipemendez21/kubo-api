import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/apiError';
import { moviesService } from '../movies/movie.service';
import { CreateUserDto } from './user.types';

const prisma = new PrismaClient();

export class UserService {
  async getAll() {
    return await prisma.user.findMany({
      include: { watched: { include: { movie: true } } }
    });
  }

  async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        watched: {
          include: { movie: true }
        }
      }
    });
    if (!user) throw new ApiError(404, 'Usuario no encontrado');
    return user;
  }

  async create(data: CreateUserDto) {
    const userExist = await prisma.user.findUnique({where: {email: data.email}})
    if (userExist){
        throw new ApiError(409, `The user with email ${data.email} already exist`);
    }
    return await prisma.user.create({ data });
  }

  async markMovieAsWatched(userId: number, movieId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(404, `The user with id ${userId} not exist`);

    const movie = await moviesService.getById(movieId);
    if (!movie) throw new ApiError(404, `The movie with id ${movieId} not exist`);

    return await prisma.userWatchedMovie.upsert({
      where: { userId_movieId: { userId, movieId } },
      update: {},
      create: { userId, movieId }
    });
  }
}

export const userService = new UserService();
