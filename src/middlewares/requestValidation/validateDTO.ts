import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export default function validateDto(
  schema: { body?: AnySchema; params?: AnySchema },
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.body?.validate(req.body);
      req.params = await schema.params?.validate(req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
}
