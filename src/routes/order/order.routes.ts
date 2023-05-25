import { Router } from "express";
import OrderController from "../../controllers/order/order.controller";
import Authentication from "../../middlewares/authentication/authentication";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { orderSchema } from "../../middlewares/requestValidation/schemas/orderSchema";

const orderRouters = Router();

orderRouters.post(
  "/order",
  Authentication.authClient,
  validateDto(orderSchema.create),
  OrderController.createOrder,
);
orderRouters.get(
  "/order/user/:id",
  Authentication.authClient,
  validateDto(orderSchema.onlyIdRequired),
  OrderController.getUserOrders,
);
orderRouters.delete(
  "/order/:id",
  Authentication.authClient,
  validateDto(orderSchema.onlyIdRequired),
  OrderController.deleteOrder,
);

orderRouters.get(
  "/order",
  Authentication.authAdmin,
  OrderController.getAllOrders,
);
orderRouters.put(
  "/order/:id",
  Authentication.authAdmin,
  validateDto(orderSchema.update),
  OrderController.updateOrder,
);
orderRouters.get(
  "/order/product/:id",
  Authentication.authAdmin,
  validateDto(orderSchema.onlyIdRequired),
  OrderController.getOrdersByProduct,
);

export default orderRouters;
