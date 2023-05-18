import { Router } from "express";
import CategoryController from "../../controllers/category/category.controller";
import Authentication from "../../middlewares/authentication/authentication";

const categoryRoutes = Router();

categoryRoutes.get("/category", CategoryController.getAll);
categoryRoutes.post(
  "/category",
  Authentication.authAdmin,
  CategoryController.create,
);
categoryRoutes.put(
  "/category/:id",
  Authentication.authAdmin,
  CategoryController.update,
);
categoryRoutes.delete(
  "/category/:id",
  Authentication.authAdmin,
  CategoryController.delete,
);

export default categoryRoutes;
