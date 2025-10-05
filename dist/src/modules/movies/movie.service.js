"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesService = void 0;
const database_1 = __importDefault(require("../../config/database"));
const apiError_1 = require("../../utils/apiError");
exports.moviesService = {
    async findAll(filters) {
        const limit = filters.limit ? filters.limit : 10;
        const page = filters.page ? filters.page : 1;
        const skip = limit * (page - 1);
        let where = {};
        if (filters.category) {
            const category = filters.category.toString().toLowerCase();
            where.category = {
                name: {
                    equals: category,
                    mode: "insensitive"
                }
            };
        }
        if (filters.title) {
            const title = filters.title.toString().toLowerCase();
            where.title = {
                contains: title,
                mode: "insensitive",
            };
        }
        const order = filters.orderBy ? "desc" : "asc";
        const sortBy = filters.orderBy ? filters.orderBy : "id";
        return await database_1.default.movie.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order
            },
            include: {
                category: true,
            },
        });
    },
    async getById(id) {
        const movie = await database_1.default.movie.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        return movie;
    },
    async create(data) {
        const movieExist = await database_1.default.movie.findFirst({
            where: {
                title: {
                    equals: data.title,
                    mode: "insensitive",
                },
            }
        });
        if (movieExist)
            throw new apiError_1.ApiError(409, `Ya existe una pelicula con el titulo ${movieExist.title}`);
        const categoryExists = await database_1.default.category.findUnique({
            where: { id: data.categoryId }
        });
        if (!categoryExists) {
            throw new apiError_1.ApiError(404, `Category not found with id ${data.categoryId}`);
        }
        return await database_1.default.movie.create({
            data: {
                ...data,
                premiereDate: new Date(data.premiereDate),
            },
            include: {
                category: true,
            },
        });
    },
    async update(id, data) {
        if (data.categoryId) {
            const categoryExists = await database_1.default.category.findUnique({
                where: { id: data.categoryId }
            });
            if (!categoryExists) {
                throw new apiError_1.ApiError(404, `Category not found with id ${data.categoryId}`);
            }
        }
        return await database_1.default.movie.update({
            where: { id },
            data: {
                ...data,
                ...(data.premiereDate && { premiereDate: new Date(data.premiereDate) }),
            },
            include: {
                category: true,
            },
        });
    },
    async getNewsMovies() {
        const threeWeeksAgo = new Date();
        threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
        threeWeeksAgo.setHours(0, 0, 0, 0);
        return await database_1.default.movie.findMany({
            where: { premiereDate: {
                    gte: threeWeeksAgo,
                }, },
            include: {
                category: true,
            },
        });
    },
};
