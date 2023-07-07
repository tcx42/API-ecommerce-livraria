import { Router } from "express";
import ProductController from "../../controllers/product/product.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { productSchemas } from "../../middlewares/requestValidation/schemas/productSchema";

const openProductRoutes = Router();

openProductRoutes.get("/", ProductController.getAll);
openProductRoutes.get(
  "/:id",
  validateDto(productSchemas.onlyIdRequired),
  ProductController.getById,
);
openProductRoutes.get(
  "/search/:keyword",
  validateDto(productSchemas.search),
  ProductController.search,
);
openProductRoutes.get(
  "/category/:category",
  validateDto(productSchemas.findBycategory),
  ProductController.getByCategory,
);

export default openProductRoutes;
