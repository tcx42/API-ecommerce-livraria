import { prisma } from "../../database/db";
import ApiError from "../../infra/apiErrors/ApiError";

export default class OrderRepository {
  static async newOrder(
    { userId, products }: {
      userId: number;
      products: Array<{ productId: number; quantity: number }>;
    },
  ) {
    const totalValue = await prisma.product.aggregate({
      _sum: { price: true },
      where: { id: { in: products.map((p) => p.productId) } },
    });
    if (!totalValue._sum.price) {
      throw new ApiError(500, "Falha ao resgatar preço de produtos");
    }
    return await prisma.order.create({
      data: {
        userId,
        totalValue: totalValue._sum.price,
        products: {
          create: products,
        },
      },
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
}
