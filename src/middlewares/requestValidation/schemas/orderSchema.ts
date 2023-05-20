import { array, number, object, string } from "yup";

export const orderSchema = {
  create: {
    body: object({
      userEmail: string().email().required(),
      couponId: number().optional(),
      products: array().of(object({
        productId: number().required(),
        quantity: number().required(),
        discount: number().optional(),
      })),
    }),
  },
  onlyIdRequired: {
    params: object({
      id: number().required(),
    }),
  },
};
