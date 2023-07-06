import { Router } from "express";
import OrderController from "../../controllers/order/order.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { orderSchema } from "../../middlewares/requestValidation/schemas/orderSchema";

const ordersClientRoutes = Router();

ordersClientRoutes.get("/", OrderController.getUserOrders);
ordersClientRoutes.post(
  "/",
  validateDto(orderSchema.create),
  OrderController.createOrder,
);
ordersClientRoutes.delete(
  "/:id",
  validateDto(orderSchema.onlyIdRequired),
  OrderController.deleteOrder,
);

export default ordersClientRoutes;
