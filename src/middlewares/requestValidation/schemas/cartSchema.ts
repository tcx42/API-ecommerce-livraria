import { object, string, number } from "yup";

const addProduct = object({
    body: object({
        userEmail: string().email().required(),
        productId: number().required(),
        quantity: number().required(),
    }).defined(),
}).defined();

const removeProduct = object({
    body: object({
        userEmail: string().email().required(),
        productId: number().required(),
    }).defined(),
}).defined();

export { addProduct, removeProduct };
