import { Router } from "express";
import UserController from "../../controllers/user/user.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { userSchema } from "../../middlewares/requestValidation/schemas/userSchema";

const openUserRoutes = Router();

openUserRoutes.post(
  "/signin",
  validateDto(userSchema.createUser),
  UserController.createClient,
);
openUserRoutes.post(
  "/login",
  validateDto(userSchema.login),
  UserController.login,
);
openUserRoutes.get("/logout", UserController.logout);

export default openUserRoutes;
