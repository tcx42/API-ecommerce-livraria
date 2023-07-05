import { Router } from "express";
import UserController from "../../controllers/user/user.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { userSchema } from "../../middlewares/requestValidation/schemas/userSchema";

const userAdminRoutes = Router();

userAdminRoutes.get("/", UserController.getAll);
userAdminRoutes.get(
  "/:id",
  validateDto(userSchema.paramsId),
  UserController.getUserById,
);
userAdminRoutes.put(
  "/:id",
  validateDto(userSchema.updateUserAsAdmin),
  UserController.updateAsAdmin,
);
userAdminRoutes.delete(
  "/:id",
  validateDto(userSchema.paramsId),
  UserController.deleteAsAdmin,
);

export default userAdminRoutes;
