import { Router } from "express";
import upload from "../../core/uploads/upload";
import ProductController from "../../controllers/product/product.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { productSchemas } from "../../middlewares/requestValidation/schemas/productSchema";

const productRoutes = Router();

productRoutes.get("/product", ProductController.getAll);
productRoutes.get("/product/:category", ProductController.getByCategory);
productRoutes.post(
  "/product",
  validateDto(productSchemas.newProductSchema),
  ProductController.create,
);
productRoutes.put(
  "/product/:id",
  upload.array("images"),
  ProductController.update,
);
productRoutes.delete("/product/:id", ProductController.delete);
productRoutes.post(
  "/product/:id/images",
  upload.array("images"),
  ProductController.newImage,
);
productRoutes.delete("/product/:id/images/:id", ProductController.deleteImage);

export default productRoutes;
