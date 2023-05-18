import { NextFunction, Request, Response } from "express";
import CategoryRepository from "../../repositories/category/category.repository";

export default class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryRepository.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const category = await CategoryRepository.create({ name, description });
      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const { name, description } = req.body;
      const category = await CategoryRepository.update({
        id,
        name,
        description,
      });
      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await CategoryRepository.delete(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
