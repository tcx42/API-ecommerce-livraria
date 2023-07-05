import { Router } from "express";
import userClientRoutes from "./user.client.routes";
import ordersClientRoutes from "./orders.client.routes";
import cartClientRoutes from "./cart.client.routes";

const clientRoutes = Router();

clientRoutes.use("/user", userClientRoutes);
clientRoutes.use("/order", ordersClientRoutes);
clientRoutes.use("/cart", cartClientRoutes);

export default clientRoutes;
