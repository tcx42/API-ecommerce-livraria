import { Router } from "express";
import ProductController from "../../controllers/product/product.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { productSchemas } from "../../middlewares/requestValidation/schemas/productSchema";
import upload from "../../core/uploads/upload";

const productAdminRoutes = Router();

productAdminRoutes.post(
  "/",
  upload.array("images"),
  validateDto(productSchemas.newProduct),
  ProductController.create,
);
productAdminRoutes.put(
  "/:id",
  upload.array("images"),
  validateDto(productSchemas.updateProduct),
  ProductController.update,
);
productAdminRoutes.delete(
  "/:id",
  validateDto(productSchemas.onlyIdRequired),
  ProductController.delete,
);
productAdminRoutes.post(
  "/:id/images",
  upload.array("images"),
  validateDto(productSchemas.onlyIdRequired),
  ProductController.newImage,
);
productAdminRoutes.delete(
  "/images/:id",
  validateDto(productSchemas.onlyIdRequired),
  ProductController.deleteImage,
);

export default productAdminRoutes;
