import { NextFunction, Request, Response } from "express";
import OrderRepository from "../../repositories/order/order.repository";
import { prisma } from "../../database/db";
import ApiError from "../../infra/apiErrors/ApiError";

export default class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userEmail = req.user?.email;
      const { couponId, products } = req.body;
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true },
      });
      if (!user) throw new ApiError(404, "Usuário não encontrado.");
      const order = await OrderRepository.create({
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
      const orders = await OrderRepository.findByUser(id);
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const order = await OrderRepository.update({ id, ...req.body });
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await OrderRepository.delete(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderRepository.findAll();
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
      const orders = await OrderRepository.findByProduct(id);
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}
