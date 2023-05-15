import { NextFunction, Request, Response } from "express";
import ApiError from "../../infra/apiErrors/ApiError";
import { JsonWebTokenError } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error);
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json(error.message);
  }
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json(error.message);
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(404).json(error.meta?.cause);
  }
  return res.status(500).json("Erro interno do servidor.");
}
