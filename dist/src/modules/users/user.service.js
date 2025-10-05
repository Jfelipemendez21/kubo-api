"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const client_1 = require("@prisma/client");
const apiError_1 = require("../../utils/apiError");
const movie_service_1 = require("../movies/movie.service");
const prisma = new client_1.PrismaClient();
class UserService {
    async getAll() {
        return await prisma.user.findMany({
            include: { watched: { include: { movie: true } } }
        });
    }
    async getById(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                watched: {
                    include: { movie: true }
                }
            }
        });
        if (!user)
            throw new apiError_1.ApiError(404, 'Usuario no encontrado');
        return user;
    }
    async create(data) {
        const userExist = await prisma.user.findUnique({ where: { email: data.email } });
        if (userExist) {
            throw new apiError_1.ApiError(409, `El usuario con email ${data.email} ya existe`);
        }
        return await prisma.user.create({ data });
    }
    async markMovieAsWatched(userId, movieId) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new apiError_1.ApiError(404, `El usuario con id ${userId} no existe`);
        const movie = await movie_service_1.moviesService.getById(movieId);
        if (!movie)
            throw new apiError_1.ApiError(404, `La película con id ${movieId} no existe`);
        return await prisma.userWatchedMovie.upsert({
            where: { userId_movieId: { userId, movieId } },
            update: {},
            create: { userId, movieId }
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
