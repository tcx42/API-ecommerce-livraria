import { Decimal } from "@prisma/client/runtime";
import { prisma } from "../../database/db";
import ApiError from "../../infra/apiErrors/ApiError";

export default class OrderRepository {
  static async create(
    { userId, products }: {
      userId: number;
      products: Array<{ productId: number; quantity: number }>;
    },
  ) {
    return await prisma.$transaction(async (tx) => {
      const totalValue = await tx.product.aggregate({
        _sum: { price: true },
        where: { id: { in: products.map((p) => p.productId) } },
      });
      if (!totalValue._sum.price) {
        throw new ApiError(400, "Produto inválido ou inexistente.");
      }
      for (const product of products) {
        await tx.product.update({
          where: { id: product.productId },
          data: { inventory: { decrement: product.quantity } },
        });
      }
      return await tx.order.create({
        data: {
          userId,
          totalValue: totalValue._sum.price,
          products: {
            create: products,
          },
        },
      });
    });
  }

  static async findAll() {
    return await prisma.order.findMany({
      include: { products: true },
    });
  }

  static async findByUser(userId: number) {
    return await prisma.order.findMany({
      where: {
        userId,
      },
      include: { products: true },
    });
  }

  static async findByProduct(id: number) {
    return await prisma.product.findMany({
      where: { id },
      include: { orders: true },
    });
  }

  static async update(
    { id, products, totalValue, couponId }: {
      id: number;
      products?: { productId: number; quantity?: number; discount?: Decimal }[];
      totalValue?: Decimal;
      couponId?: number;
    },
  ) {
    return await prisma.order.update({
      where: { id },
      data: {
        products: {
          updateMany: products?.map((p) => {
            return {
              where: {
                productId: p.productId,
              },
              data: {
                quantity: p.quantity,
                discount: p.discount,
              },
            };
          }),
        },
        totalValue,
        couponId: couponId,
      },
    });
  }

  static async delete(id: number) {
    await prisma.$transaction(async (tx) => {
      const products = await tx.productOrder.findMany({
        where: { orderId: id },
        select: { productId: true, quantity: true },
      });
      for (const p of products) {
        await tx.product.update({
          where: { id: p.productId },
          data: { inventory: { increment: p.quantity } },
        });
      }
      await tx.productOrder.deleteMany({
        where: { orderId: id },
      });
      await tx.order.delete({
        where: { id },
      });
    });
  }
}
