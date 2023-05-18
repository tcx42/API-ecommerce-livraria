import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../../config/envConfig";
import ApiError from "../../infra/apiErrors/ApiError";
import IjwtPayload from "../../interfaces/IjwtPayload";

export default class Authentication {
  static generateToken(payload: IjwtPayload) {
    return jwt.sign(payload, env.JWTSECRET, {
      expiresIn: "30m",
    });
  }
  static generateRefreshToken(email: string) {
    return jwt.sign({ email: email }, env.JWTREFRESHSECRET, {
      expiresIn: "1d",
    });
  }
  static decode(token: string): IjwtPayload {
    const value = token?.split(" ")[1] || "";
    const res = jwt.decode(value);
    if (!res || typeof (res) === "string") {
      throw new ApiError(401, "Token inválido");
    }
    return res as IjwtPayload;
  }
  static validateUserRoleForAction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email } = req.params;
      const jwt = Authentication.decode(
        req.headers.authorization!,
      );
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
  static authClient(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1] || "";
      jwt.verify(token, env.JWTSECRET);
      next();
    } catch (error) {
      next(error);
    }
  }
  static authAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1] || "";
      const decoded = jwt.verify(token, env.JWTSECRET) as IjwtPayload;
      if (decoded.role !== "admin") {
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
}
