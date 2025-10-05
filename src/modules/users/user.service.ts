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
    const userExist = prisma.user.findUnique({where: {email: data.email}})
    if (userExist){
        throw new ApiError(409, `El usuario con email ${data.email} ya existe`);
    }
    return await prisma.user.create({ data });
  }

  async markMovieAsWatched(userId: number, movieId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ApiError(404, `El usuario con id ${userId} no existe`);

    const movie = await moviesService.getById(movieId);
    if (!movie) throw new ApiError(404, `La película con id ${movieId} no existe`);

    return await prisma.userWatchedMovie.upsert({
      where: { userId_movieId: { userId, movieId } },
      update: {},
      create: { userId, movieId }
    });
  }
}

export const userService = new UserService();
