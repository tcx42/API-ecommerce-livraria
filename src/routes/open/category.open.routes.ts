import { Router } from "express";
import CategoryController from "../../controllers/category/category.controller";

const openCategoryRoutes = Router();

openCategoryRoutes.get("/", CategoryController.getAll);

export default openCategoryRoutes;
