import { NextFunction, Request, Response } from "express";
import ApiError from "../../infra/apiErrors/ApiError";
import Jwtoken from "../../core/utils/jwtoken";
import { TokenExpiredError } from "jsonwebtoken";

export default class Authentication {
  static authClient(req: Request, res: Response, next: NextFunction) {
    try {
      Authentication.verify(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
  static authAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const user = Authentication.verify(req, res);
      if (user?.role !== "admin") {
        throw new ApiError(
          403,
          "Acesso exclusivo para administradores.",
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  private static verify(req: Request, res: Response) {
    try {
      Jwtoken.verify(req.cookies.jsonwebtoken);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        Jwtoken.verifyRefresh(req.cookies.refreshtoken);
        const user = Jwtoken.decode(req.cookies.jsonwebtoken);
        const token = Jwtoken.generateToken({
          name: user.name,
          email: user.email,
          role: user.role,
        });
        const refreshtoken = Jwtoken.generateRefreshToken(user.email);
        res.cookie("jsonwebtoken", token);
        res.cookie("refreshtoken", refreshtoken);
        return user;
      } else {
        throw error;
      }
    }
  }
  static validateUserRoleForAction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.params;
      const jwt = Jwtoken.decode(req.cookies.jsonwebtoken);
      if (jwt.role === "client" && jwt.email !== email) {
        throw new ApiError(
          401,
          "Requisição não permitida para este tipo de usuário",
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
