"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
exports.categoryController = {
    async getAll(req, res, next) {
        try {
            const users = await category_service_1.categoryService.getAll();
            res.json({ success: true, content: users });
        }
        catch (error) {
            next(error);
        }
    },
    async create(req, res, next) {
        try {
            const data = req.body;
            const newUser = await category_service_1.categoryService.create(data);
            res.status(201).json({ success: true, content: newUser });
        }
        catch (error) {
            next(error);
        }
    },
};
