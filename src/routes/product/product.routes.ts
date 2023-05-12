import { Router } from "express";
import upload from "../../core/uploads/upload";
import ProductController from "../../controllers/product/product.controller";

const productRoutes = Router();

productRoutes.get("/product", ProductController.getAll);
productRoutes.get("/product/:category", ProductController.getByCategory);
productRoutes.post(
    "/product",
    upload.array("images"),
    ProductController.create
);
productRoutes.put(
    "/product/:id",
    upload.array("images"),
    ProductController.update
);
productRoutes.delete("/product/:id", ProductController.delete);
productRoutes.post("/product/:id/images");
productRoutes.delete("/product/:id/images/:id");

export default productRoutes;
