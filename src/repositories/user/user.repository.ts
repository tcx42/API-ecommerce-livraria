import Encryption from "../../core/utils/encryption";
import { prisma } from "../../database/db";

export default class User {
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
        return await prisma.user.create({
            data: {
                name,
                email,
                password: Encryption.hashPassword(password),
                role,
            },
        });
    }

    static async updateUser({
        email,
        name,
        password,
        role,
    }: {
        email: string;
        name?: string;
        password?: string;
        role?: "admin" | "client";
    }) {
        return await prisma.user.update({
            where: { email },
            data: {
                name,
                password: password
                    ? Encryption.hashPassword(password)
                    : undefined,
                role,
            },
        });
    }

    static async deleteUser(email: string) {
        return await prisma.user.delete({
            where: { email },
        });
    }
}
