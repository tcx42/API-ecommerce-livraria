import { Router } from "express";
import UserController from "../../controllers/user/user.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { userSchema } from "../../middlewares/requestValidation/schemas/userSchema";

const userRoutes = Router();

userRoutes.post(
  "/user/login",
  validateDto(userSchema.login),
  UserController.login,
);
userRoutes.get("/user/:email", UserController.getUserByEmail);
userRoutes.put(
  "/user/:email",
  validateDto(userSchema.updateUser),
  UserController.update,
);
userRoutes.delete(
  "/user/:email",
  validateDto(userSchema.deleteUser),
  UserController.delete,
);
userRoutes.post(
  "/user",
  validateDto(userSchema.createUser),
  UserController.createClient,
);
userRoutes.post(
  "/admin",
  validateDto(userSchema.createUser),
  UserController.createAdmin,
);
userRoutes.get("/user", UserController.getAll);

export default userRoutes;
