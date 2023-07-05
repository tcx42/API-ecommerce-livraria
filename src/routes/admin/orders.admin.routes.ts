import { Router } from "express";
import OrderController from "../../controllers/order/order.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { orderSchema } from "../../middlewares/requestValidation/schemas/orderSchema";

const ordersAdminRoutes = Router();

ordersAdminRoutes.get("/", OrderController.getAllOrders);
ordersAdminRoutes.get(
  "/user/:id",
  validateDto(orderSchema.onlyIdRequired),
  OrderController.getUserOrders,
);
ordersAdminRoutes.get(
  "/product/:id",
  validateDto(orderSchema.onlyIdRequired),
  OrderController.getOrdersByProduct,
);
ordersAdminRoutes.put(
  "/:id",
  validateDto(orderSchema.update),
  OrderController.updateOrder,
);

export default ordersAdminRoutes;
