import { Router } from "express";
import CategoryController from "../../controllers/category/category.controller";
import Authentication from "../../middlewares/authentication/authentication";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { categorySchema } from "../../middlewares/requestValidation/schemas/categorySchema";

const categoryRoutes = Router();

categoryRoutes.get("/category", CategoryController.getAll);
categoryRoutes.post(
  "/category",
  Authentication.authAdmin,
  validateDto(categorySchema.create),
  CategoryController.create,
);
categoryRoutes.put(
  "/category/:id",
  Authentication.authAdmin,
  validateDto(categorySchema.update),
  CategoryController.update,
);
categoryRoutes.delete(
  "/category/:id",
  Authentication.authAdmin,
  validateDto(categorySchema.onlyIdRequired),
  CategoryController.delete,
);

export default categoryRoutes;
