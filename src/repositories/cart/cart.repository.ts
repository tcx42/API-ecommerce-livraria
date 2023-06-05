// cart.repository.ts

import { Prisma, PrismaClient } from "@prisma/client";
import ApiError from "../../infra/apiErrors/ApiError";

const prisma = new PrismaClient();

interface CartCreateInput {
    userId: number;
}

interface ProductCartCreateInput {
    quantity: number;
    productId: number;
    cartId: number;
}

export default class CartRepository {

    static async getCartWithProducts(cartId: number) {
        return await prisma.cart.findUnique({
            where: { id: cartId },
            include: { products: true },
        });
    }

    static async createCart(userId: number) {
        const data: CartCreateInput = {
            userId,
        };

        return await prisma.cart.create({ data });
    }

    static async findProductInCart(cartId: number, productId: number) {
        return await prisma.productCart.findFirst({
            where: {
                cartId,
                productId,
            },
        });
    }

    static async updateProductQuantity(cartItemId: number, quantity: number) {
        return await prisma.productCart.update({
            where: { id: cartItemId },
            data: { quantity },
        });
    }

    static async addProductToCart(
      userId: number,
      productId: number,
      quantity: number
    ) {
      return await prisma.cart.update({
      where: { userId },
      data: {
        products: {
          create: {
            productId,
            quantity
          }
        }
      }
    })
    }

    static async removeProductFromCart(cartItemId: number) {
        return await prisma.productCart.delete({
            where: { id: cartItemId },
        });
    }

    static async findCartByUserId(userId: number) {
        return await prisma.cart.findFirst({
            where: { userId },
        });
    }

    static async findProductInUserCart(userId: number, productId: number) {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        return await prisma.productCart.findFirst({
            where: {
                cartId: cart.id,
                productId,
            },
        });
    }
}
