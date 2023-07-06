import { Router } from "express";
import CategoryController from "../../controllers/category/category.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { categorySchema } from "../../middlewares/requestValidation/schemas/categorySchema";

const categoryAdminRoutes = Router();

categoryAdminRoutes.post(
  "/",
  validateDto(categorySchema.create),
  CategoryController.create,
);
categoryAdminRoutes.put(
  "/:id",
  validateDto(categorySchema.update),
  CategoryController.update,
);
categoryAdminRoutes.put(
  "/:id",
  validateDto(categorySchema.onlyIdRequired),
  CategoryController.delete,
);

export default categoryAdminRoutes;
