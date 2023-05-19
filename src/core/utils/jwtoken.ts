import IjwtPayload from "../../interfaces/IjwtPayload";
import env from "../../config/envConfig";
import jwt from "jsonwebtoken";
import ApiError from "../../infra/apiErrors/ApiError";

export default class Jwtoken {
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
  static verify(token: string | undefined) {
    if (!token) throw new ApiError(401, "Token ausente.");
    return jwt.verify(token, env.JWTSECRET) as IjwtPayload;
  }
  static decode(token: string | undefined) {
    if (!token) throw new ApiError(401, "Token ausente.");
    return jwt.decode(token) as IjwtPayload;
  }
  static verifyRefresh(token: string | undefined) {
    if (!token) throw new ApiError(401, "Token ausente.");
    return jwt.verify(token, env.JWTREFRESHSECRET);
  }
}
