import { Router } from "express";
import openUserRoutes from "./user.open.routes";
import openCategoryRoutes from "./category.open.routes";
import openProductRoutes from "./product.open.routes";

const openRoutes = Router();

openRoutes.use("/category", openCategoryRoutes);
openRoutes.use("/user", openUserRoutes);
openRoutes.use("/product", openProductRoutes);

export default openRoutes;
