import IjwtPayload from "../../interfaces/IjwtPayload";
export {};
declare global {
  namespace Express {
    export interface Request {
      user?: IjwtPayload;
    }
  }
}
