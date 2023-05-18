import { Router } from "express";
import productRoutes from "./product/product.routes";
import orderRouters from "./order/order.routes";
import userRoutes from "./user/user.routes";
import categoryRoutes from "./category/category.routes";

const routes = Router();

routes.use(productRoutes);
routes.use(orderRouters);
routes.use(userRoutes);
routes.use(categoryRoutes);

routes.get("/health", (req, res) => {
  return res.sendStatus(200);
});

export default routes;
