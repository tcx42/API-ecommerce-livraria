import { Router } from "express";
import upload from "../../core/uploads/upload";
import ProductController from "../../controllers/product/product.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { productSchemas } from "../../middlewares/requestValidation/schemas/productSchema";
import Authentication from "../../middlewares/authentication/authentication";

const productRoutes = Router();

productRoutes.get("/product", ProductController.getAll);
productRoutes.get("/product/:category", ProductController.getByCategory);
productRoutes.post(
  "/product",
  Authentication.authAdmin,
  validateDto(productSchemas.newProduct),
  ProductController.create,
);
productRoutes.put(
  "/product/:id",
  Authentication.authAdmin,
  upload.array("images"),
  ProductController.update,
);
productRoutes.delete(
  "/product/:id",
  Authentication.authAdmin,
  ProductController.delete,
);
productRoutes.post(
  "/product/:id/images",
  Authentication.authAdmin,
  upload.array("images"),
  ProductController.newImage,
);
productRoutes.delete(
  "/product/:id/images/:id",
  Authentication.authAdmin,
  ProductController.deleteImage,
);

export default productRoutes;
