import { Router } from "express";
import OrderController from "../../controllers/order/order.controller";
import Authentication from "../../middlewares/authentication/authentication";

const orderRouters = Router();

orderRouters.post(
  "/order",
  Authentication.authClient,
  OrderController.createOrder,
);
orderRouters.get(
  "/order/user/:id",
  Authentication.authClient,
  OrderController.getUserOrders,
);
orderRouters.delete(
  "/order/:id",
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
  Authentication.authAdmin,
  OrderController.getOrdersByProduct,
);

export default orderRouters;
