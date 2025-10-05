"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const apiError_1 = require("../../utils/apiError");
const user_service_1 = require("./user.service");
exports.userController = {
    async getAll(req, res, next) {
        try {
            const users = await user_service_1.userService.getAll();
            res.json({ success: true, content: users });
        }
        catch (error) {
            next(error);
        }
    },
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            if (!Number(id)) {
                throw new apiError_1.ApiError(400, "El id debe ser un numero");
            }
            const user = await user_service_1.userService.getById(Number(id));
            res.json({ success: true, content: user });
        }
        catch (error) {
            next(error);
        }
    },
    async create(req, res, next) {
        try {
            const { name, email } = req.body;
            const newUser = await user_service_1.userService.create({ name, email });
            res.status(201).json({ success: true, content: newUser });
        }
        catch (error) {
            next(error);
        }
    },
    async markWatched(req, res, next) {
        try {
            const userId = Number(req.params.userId);
            const movieId = Number(req.params.movieId);
            const watched = await user_service_1.userService.markMovieAsWatched(userId, movieId);
            res.json({ success: true, content: watched });
        }
        catch (error) {
            next(error);
        }
    }
};
