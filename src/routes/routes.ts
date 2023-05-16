import { Router } from "express";
import productRoutes from "./product/product.routes";
import orderRouters from "./order/order.routes";

const routes = Router();

routes.use(productRoutes);
routes.use(orderRouters);

routes.get("/health", (req, res) => {
  return res.status(200).json("ok");
});

export default routes;
