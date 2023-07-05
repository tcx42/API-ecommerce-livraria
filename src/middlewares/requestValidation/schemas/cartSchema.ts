import { number, object, string } from "yup";

const cartSchemas = {
  addProduct: {
    body: object({
      productId: number().required(),
      quantity: number().required(),
    }).defined(),
  },
  removeProduct: {
    body: object({
      productId: number().required(),
    }).defined(),
  },
  onlyIdRequired: {
    params: object({
      id: number().required(),
    }),
  },
};

export default cartSchemas;
