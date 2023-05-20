import { Router } from "express";
import upload from "../../core/uploads/upload";
import ProductController from "../../controllers/product/product.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { productSchemas } from "../../middlewares/requestValidation/schemas/productSchema";
import Authentication from "../../middlewares/authentication/authentication";

const productRoutes = Router();

productRoutes.get("/product", ProductController.getAll);
productRoutes.get(
  "/product/:category",
  validateDto(productSchemas.findBycategory),
  ProductController.getByCategory,
);
productRoutes.post(
  "/product",
  Authentication.authAdmin,
  validateDto(productSchemas.newProduct),
  ProductController.create,
);
productRoutes.put(
  "/product/:id",
  validateDto(productSchemas.updateProduct),
  Authentication.authAdmin,
  upload.array("images"),
  ProductController.update,
);
productRoutes.delete(
  "/product/:id",
  validateDto(productSchemas.onlyIdRequired),
  Authentication.authAdmin,
  ProductController.delete,
);
productRoutes.post(
  "/product/:id/images",
  validateDto(productSchemas.onlyIdRequired),
  Authentication.authAdmin,
  upload.array("images"),
  ProductController.newImage,
);
productRoutes.delete(
  "/product/images/:id",
  validateDto(productSchemas.onlyIdRequired),
  Authentication.authAdmin,
  ProductController.deleteImage,
);

export default productRoutes;
