import { NextFunction, Request, Response } from "express";
import OrderRepository from "../../repositories/order/order.repository";
import { prisma } from "../../database/db";
import ApiError from "../../infra/apiErrors/ApiError";

export default class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { userEmail, couponId, products } = req.body;
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true },
      });
      if (!user) throw new ApiError(404, "Usuário não encontrado.");
      const order = await OrderRepository.newOrder({
        userId: user.id,
        products: products,
      });
      return res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async getUserOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const orders = await OrderRepository.getOrdersByUser(id);
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await OrderRepository.deleteOrder(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderRepository.getOrders();
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async getOrdersByProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = parseInt(req.params.id);
      const orders = await OrderRepository.getOrdersByProduct(id);
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}
