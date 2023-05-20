import { prisma } from "../../database/db";
import ApiError from "../../infra/apiErrors/ApiError";

export default class OrderRepository {
  static async newOrder(
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

  static async getOrdersByUser(userId: number) {
    return await prisma.order.findMany({
      where: {
        userId,
      },
      include: { products: true },
    });
  }

  static async deleteOrder(id: number) {
    const deleteOrderProducts = prisma.productOrder.deleteMany({
      where: { orderId: id },
    });
    const deleteOrder = prisma.order.delete({
      where: { id },
    });
    await prisma.$transaction([deleteOrderProducts, deleteOrder]);
  }

  static async getOrders() {
    return await prisma.order.findMany();
  }

  static async getOrdersByProduct(id: number) {
    return await prisma.product.findMany({
      where: { id },
      include: { orders: true },
    });
  }
}
