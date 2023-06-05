import { Router } from "express";
import CartController from "../../controllers/cart/cart.controller";
import Authentication from "../../middlewares/authentication/authentication";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { addProduct, removeProduct } from "../../middlewares/requestValidation/schemas/cartSchema";

const cartRoutes = Router();

cartRoutes.post(
    "/cart/add",
    Authentication.authClient,
    validateDto(addProduct),
    CartController.addToCart
);

cartRoutes.post(
    "/cart/remove",
    Authentication.authClient,
    validateDto(removeProduct),
    CartController.removeFromCart
);

cartRoutes.get(
    "/cart/:cartId",
    Authentication.authClient,
    CartController.getCartWithProducts
);

export default cartRoutes;
