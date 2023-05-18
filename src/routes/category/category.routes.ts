import { Router } from "express";
import CategoryController from "../../controllers/category/category.controller";

const categoryRoutes = Router();

categoryRoutes.get("/category", CategoryController.getAll);
categoryRoutes.post("/category", CategoryController.create);
categoryRoutes.put("/category/:id", CategoryController.update);
categoryRoutes.delete("/category/:id", CategoryController.delete);

export default categoryRoutes;
