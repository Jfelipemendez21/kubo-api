"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesController = void 0;
const apiError_1 = require("../../utils/apiError");
const movie_service_1 = require("./movie.service");
exports.moviesController = {
    async getAll(req, res, next) {
        try {
            let filters = {};
            if (req.query.title)
                filters.title = req.query.title;
            if (req.query.category)
                filters.category = req.query.category;
            if (Number(req.query.page))
                filters.page = Number(req.query.page);
            if (Number(req.query.limit))
                filters.limit = Number(req.query.limit);
            if (typeof req.query.orderBy === "string" && req.query.orderBy == "premiereDate")
                filters.orderBy = req.query.orderBy;
            const movies = await movie_service_1.moviesService.findAll(filters);
            res.json({
                success: true,
                data: movies,
            });
        }
        catch (error) {
            next(error);
        }
    },
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            if (!Number(id)) {
                throw new apiError_1.ApiError(409, "El id debe ser un numero");
            }
            const movie = await movie_service_1.moviesService.getById(Number(id));
            if (!movie) {
                throw new apiError_1.ApiError(404, "Movie not found");
            }
            res.json({
                success: true,
                data: movie,
            });
        }
        catch (error) {
            next(error);
        }
    },
    async getNewsMovies(req, res, next) {
        try {
            const movies = await movie_service_1.moviesService.getNewsMovies();
            res.json({
                success: true,
                data: movies,
            });
        }
        catch (error) {
            next(error);
        }
    },
    async create(req, res, next) {
        try {
            const movie = await movie_service_1.moviesService.create(req.body);
            res.status(201).json({
                success: true,
                data: movie,
            });
        }
        catch (error) {
            next(error);
        }
    },
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const movie = await movie_service_1.moviesService.update(Number(id), req.body);
            res.json({
                success: true,
                data: movie,
            });
        }
        catch (error) {
            next(error);
        }
    },
};
