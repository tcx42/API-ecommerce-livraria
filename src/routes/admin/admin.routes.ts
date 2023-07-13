import { Router } from "express";
import ordersAdminRoutes from "./orders.admin.routes";
import categoryAdminRoutes from "./category.admin.routes";
import productAdminRoutes from "./product.admin.routes";
import UserController from "../../controllers/user/user.controller";
import userAdminRoutes from "./user.admin.routes";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { userSchema } from "../../middlewares/requestValidation/schemas/userSchema";

const adminRoutes = Router();

adminRoutes.use("/category", categoryAdminRoutes);
adminRoutes.use("/order", ordersAdminRoutes);
adminRoutes.use("/user", userAdminRoutes);
adminRoutes.use("/product", productAdminRoutes);
adminRoutes.post(
  "/register",
  validateDto(userSchema.createUser),
  UserController.createAdmin,
);

export default adminRoutes;
