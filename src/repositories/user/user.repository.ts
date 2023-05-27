import Encryption from "../../core/utils/encryption";
import { prisma } from "../../database/db";
import ApiError from "../../infra/apiErrors/ApiError";

export default class UserRepository {
  static async findUsers() {
    return await prisma.user.findMany({
      select: { name: true, email: true, role: true },
    });
  }

  static async findUserById(id: number, includePassword = false) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        email: true,
        password: includePassword,
        role: true,
      },
    });
  }

  static async findUserByEmail(email: string, includePassword = false) {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: includePassword,
        role: true,
      },
    });
  }

  static async createUser({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "client";
  }) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: Encryption.hashPassword(password),
        role,
      },
    });
    return { name: user.name, email: user.email, role: user.role };
  }

  static async updateUser({
    email,
    name,
    password,
  }: {
    email: string;
    name?: string;
    password?: string;
  }) {
    const user = await prisma.user.update({
      where: { email },
      data: {
        name,
        password: password ? Encryption.hashPassword(password) : undefined,
      },
    });
    return { name: user.name, email: user.email, role: user.role };
  }

  static async deleteUser(email: string) {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email },
        select: { id: true },
      });
      if (!user) throw new ApiError(404, "Usuário não encontrado.");
      const orders = await tx.order.findMany({
        where: { userId: user.id },
        select: { id: true },
      });
      await tx.productOrder.deleteMany({
        where: { orderId: { in: orders.map((o) => o.id) } },
      });
      await tx.order.deleteMany({
        where: { userId: user.id },
      });
      await tx.user.delete({
        where: { email },
      });
    });
  }
}
