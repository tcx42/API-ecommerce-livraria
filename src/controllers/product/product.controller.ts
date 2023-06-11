import { NextFunction, Request, Response } from "express";
import ProductRepository from "../../repositories/product/product.repository";
import storeImages from "../../core/utils/storeImages";

export default class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductRepository.findAll();
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { keyword } = req.params;
      const products = await ProductRepository.search(keyword);
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductRepository.findByCategory(
        req.params.category,
      );
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, description, inventory, categories } = req.body.data;
      let images: string[] | undefined = undefined;
      if (req.files) {
        images = storeImages(req.files as Array<Express.Multer.File>);
      }
      const product = await ProductRepository.create({
        name,
        price,
        description,
        inventory,
        categories,
        images,
      });
      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      let images: string[] | undefined = undefined;
      if (req.files) {
        images = storeImages(req.files as Array<Express.Multer.File>);
      }
      const { name, price, description, inventory, categories } = req.body.data;
      const product = await ProductRepository.update({
        id,
        name,
        price,
        description,
        inventory,
        categories,
        images,
      });
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      await ProductRepository.delete(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  static async newImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const images = storeImages(req.files as Array<Express.Multer.File>);
      const image = await ProductRepository.newImage(id, images);
      return res.status(201).json(image);
    } catch (error) {
      next(error);
    }
  }

  static async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await ProductRepository.deleteImage(id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
