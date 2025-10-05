"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = exports.CategoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryService {
    async getAll() {
        return await prisma.category.findMany();
    }
    async create(data) {
        return await prisma.category.create({ data });
    }
}
exports.CategoryService = CategoryService;
exports.categoryService = new CategoryService();
