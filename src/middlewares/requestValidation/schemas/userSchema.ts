import { number, object, string } from "yup";

export const userSchema = {
  login: {
    body: object({
      email: string().email().required(),
      password: string().required(),
    }),
  },
  createUser: {
    body: object({
      name: string().required(),
      email: string().email().required(),
      password: string().min(8).required(),
    }),
  },
  updateUserAsAdmin: {
    params: object({
      id: number().required(),
    }),
    body: object({
      name: string().optional(),
      password: string().min(8).optional(),
    }),
  },
  updateUser: {
    body: object({
      name: string().optional(),
      password: string().min(8).optional(),
    }),
  },
  paramsId: {
    params: object({
      id: number().required(),
    }),
  },
  paramsEmail: {
    params: object({
      email: string().email().required(),
    }),
  },
};
