import { Router } from "express";
import OrderController from "../../controllers/order/order.controller";

const orderRouters = Router();

orderRouters.post("/order", OrderController.createOrder);
orderRouters.get("/order/user/:id", OrderController.getUserOrders);
orderRouters.delete("/order/:id", OrderController.deleteOrder);

export default orderRouters;
