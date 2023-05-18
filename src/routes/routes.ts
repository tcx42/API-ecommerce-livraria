import { Router } from "express";
import productRoutes from "./product/product.routes";
import orderRouters from "./order/order.routes";
import userRoutes from "./user/user.routes";

const routes = Router();

routes.use(productRoutes);
routes.use(orderRouters);
routes.use(userRoutes);

routes.get("/health", (req, res) => {
  return res.status(200).json("ok");
});

export default routes;
