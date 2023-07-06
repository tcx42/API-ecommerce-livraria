import { Router } from "express";
import CartController from "../../controllers/cart/cart.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import cartSchemas from "../../middlewares/requestValidation/schemas/cartSchema";

const cartClientRoutes = Router();

cartClientRoutes.get(
  "/",
  validateDto(cartSchemas.onlyIdRequired),
  CartController.getCartWithProducts,
);
cartClientRoutes.post(
  "/add",
  validateDto(cartSchemas.addProduct),
  CartController.addToCart,
);
cartClientRoutes.post(
  "/remove",
  validateDto(cartSchemas.removeProduct),
  CartController.removeFromCart,
);

export default cartClientRoutes;
