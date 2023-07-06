import Encryption from "../../core/utils/encryption";
import { prisma } from "../../database/db";
import ApiError from "../../infra/apiErrors/ApiError";

export default class UserRepository {
  static async findUsers() {
    return await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
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
    id,
    name,
    password,
  }: {
    id: number;
    name?: string;
    password?: string;
  }) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        password: password ? Encryption.hashPassword(password) : undefined,
      },
    });
    return { name: user.name, email: user.email, role: user.role };
  }

  static async deleteUser(id: number) {
    await prisma.$transaction(async (tx) => {
      const orders = await tx.order.findMany({
        where: { id },
        select: { id: true },
      });
      await tx.productOrder.deleteMany({
        where: { orderId: { in: orders.map((o) => o.id) } },
      });
      await tx.order.deleteMany({
        where: { id },
      });
      await tx.user.delete({
        where: { id },
      });
    });
  }
}
