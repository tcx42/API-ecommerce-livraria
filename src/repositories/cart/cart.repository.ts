// cart.repository.ts

import { Prisma, PrismaClient } from "@prisma/client";

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
        return prisma.cart.findUnique({
            where: { id: cartId },
            include: { products: true },
        });
    }

    static async createCart(userId: number) {
        const data: CartCreateInput = {
            userId,
        };

        return prisma.cart.create({ data });
    }

    static async findProductInCart(cartId: number, productId: number) {
        return prisma.productCart.findFirst({
            where: {
                cartId,
                productId,
            },
        });
    }

    static async updateProductQuantity(cartItemId: number, quantity: number) {
        return prisma.productCart.update({
            where: { id: cartItemId },
            data: { quantity },
        });
    }

    static async addProductToCart(
        cartId: number,
        productId: number,
        quantity: number
    ) {
        const data: ProductCartCreateInput = {
            quantity,
            productId,
            cartId,
        };

        return prisma.productCart.create({ data });
    }

    static async removeProductFromCart(cartItemId: number) {
        return prisma.productCart.delete({
            where: { id: cartItemId },
        });
    }

    static async findCartByUserId(userId: number) {
        return prisma.cart.findFirst({
            where: { userId },
        });
    }

    static async findProductInUserCart(userId: number, productId: number) {
        const cart = await this.findCartByUserId(userId);
        if (!cart) return null;

        return prisma.productCart.findFirst({
            where: {
                cartId: cart.id,
                productId,
            },
        });
    }
}
