import { Router } from "express";
import UserController from "../../controllers/user/user.controller";
import validateDto from "../../middlewares/requestValidation/validateDTO";
import { userSchema } from "../../middlewares/requestValidation/schemas/userSchema";

const userClientRoutes = Router();

userClientRoutes.get("/", UserController.getUserByToken);
userClientRoutes.put(
  "/",
  validateDto(userSchema.updateUser),
  UserController.update,
);
userClientRoutes.delete("/", UserController.delete);

export default userClientRoutes;
