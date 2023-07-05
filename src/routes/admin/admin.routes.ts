import { Router } from "express";
import ordersAdminRoutes from "./orders.admin.routes";
import categoryAdminRoutes from "./category.admin.routes";
import productAdminRoutes from "./product.admin.routes";
import UserController from "../../controllers/user/user.controller";
import userAdminRoutes from "./user.admin.routes";

const adminRoutes = Router();

adminRoutes.use("/category", categoryAdminRoutes);
adminRoutes.use("/order", ordersAdminRoutes);
adminRoutes.use("/user", userAdminRoutes);
adminRoutes.use("/product", productAdminRoutes);
adminRoutes.post("/register", UserController.createAdmin);

export default adminRoutes;
