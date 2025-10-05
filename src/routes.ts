import { Router } from "express";
import moviesRoutes from "./modules/movies/movie.routes";
import userRoutes from "./modules/users/user.routes";
import categoriesRoutes from "./modules/categories/category.routes";

const router = Router();

// Rutas principales
router.use("/movies", moviesRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoriesRoutes)

router.get('/', (req, res) => {
  res.json({ message: 'API saludable!' });
});

export default router; 