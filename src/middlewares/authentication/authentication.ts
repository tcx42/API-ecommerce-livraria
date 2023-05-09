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
                    "Acesso exclusivo para administradores."
                );
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}
