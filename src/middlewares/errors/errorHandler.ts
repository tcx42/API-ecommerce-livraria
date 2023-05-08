import { NextFunction, Request, Response } from "express";
import ApiError from "../../infra/apiErrors/ApiError";

export default function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json(error.message);
    }
    return res.status(500).json("Erro interno do servidor.");
}
