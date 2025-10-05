"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_routes_1 = __importDefault(require("./modules/movies/movie.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const category_routes_1 = __importDefault(require("./modules/categories/category.routes"));
const router = (0, express_1.Router)();
// Rutas principales
router.use("/movies", movie_routes_1.default);
router.use("/users", user_routes_1.default);
router.use("/categories", category_routes_1.default);
router.get('/', (req, res) => {
    res.json({ message: 'API saludable!' });
});
exports.default = router;
