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
  update: {
    params: object({
      id: number().required(),
    }),
    body: object({
      totalValue: number().optional(),
      couponId: number().optional(),
      products: array().of(object({
        productId: number().required(),
        quantity: number().optional(),
        discount: number().optional(),
      })).optional(),
    }),
  },
  onlyIdRequired: {
    params: object({
      id: number().required(),
    }),
  },
};
