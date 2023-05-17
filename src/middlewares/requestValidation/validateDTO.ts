import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export default function validateDto(schema: AnySchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validBody = await schema.validate(req.body);
      req.body = validBody;
      next();
    } catch (error) {
      next(error);
    }
  };
}
