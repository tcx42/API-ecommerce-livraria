import { Router } from "express";
import OrderController from "../../controllers/order/order.controller";
import Authentication from "../../middlewares/authentication/authentication";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { orderSchema } from "../../middlewares/requestValidation/schemas/orderSchema";

const orderRouters = Router();

orderRouters.post(
  "/order",
  validateDto(orderSchema.create),
  Authentication.authClient,
  OrderController.createOrder,
);
orderRouters.get(
  "/order/user/:id",
  validateDto(orderSchema.onlyIdRequired),
  Authentication.authClient,
  OrderController.getUserOrders,
);
orderRouters.delete(
  "/order/:id",
  validateDto(orderSchema.onlyIdRequired),
  Authentication.authClient,
  OrderController.deleteOrder,
);

orderRouters.get(
  "/order",
  Authentication.authAdmin,
  OrderController.getAllOrders,
);
orderRouters.get(
  "/order/product/:id",
  validateDto(orderSchema.onlyIdRequired),
  Authentication.authAdmin,
  OrderController.getOrdersByProduct,
);

export default orderRouters;
