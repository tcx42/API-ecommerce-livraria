import { Router } from "express";
import upload from "../../core/uploads/upload";
import ProductController from "../../controllers/product/product.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { productSchemas } from "../../middlewares/requestValidation/schemas/productSchema";
import Authentication from "../../middlewares/authentication/authentication";

const productRoutes = Router();

productRoutes.get("/product", ProductController.getAll);
productRoutes.get(
  "/product/search/:keyword",
  validateDto(productSchemas.search),
  ProductController.search,
);
productRoutes.get(
  "/product/:category",
  validateDto(productSchemas.findBycategory),
  ProductController.getByCategory,
);
productRoutes.post(
  "/product",
  Authentication.authAdmin,
  upload.array("images"),
  validateDto(productSchemas.newProduct),
  ProductController.create,
);
productRoutes.put(
  "/product/:id",
  Authentication.authAdmin,
  upload.array("images"),
  validateDto(productSchemas.updateProduct),
  ProductController.update,
);
productRoutes.delete(
  "/product/:id",
  Authentication.authAdmin,
  validateDto(productSchemas.onlyIdRequired),
  ProductController.delete,
);
productRoutes.post(
  "/product/:id/images",
  Authentication.authAdmin,
  validateDto(productSchemas.onlyIdRequired),
  upload.array("images"),
  ProductController.newImage,
);
productRoutes.delete(
  "/product/images/:id",
  Authentication.authAdmin,
  validateDto(productSchemas.onlyIdRequired),
  ProductController.deleteImage,
);

export default productRoutes;
