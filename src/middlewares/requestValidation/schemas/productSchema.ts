import { array, number, object, string } from "yup";

export const productSchemas = {
  findBycategory: {
    params: object({
      category: string().required(),
    }),
  },
  search: {
    params: object({
      filename: string().required(),
    }),
  },
  newProduct: {
    body: object({
      data: object({
        name: string().required(),
        description: string().required(),
        price: number().required(),
        categories: array().of(string()).required(),
        inventory: number().required(),
      }),
    }),
  },
  updateProduct: {
    params: object({
      id: number().required(),
    }),
    body: object({
      data: object({
        name: string().optional(),
        description: string().optional(),
        price: number().optional(),
        categories: array().of(string()).optional(),
        inventory: number().optional(),
      }),
    }),
  },
  onlyIdRequired: {
    params: object({
      id: number().required(),
    }),
  },
};
