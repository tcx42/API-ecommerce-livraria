import { NextFunction, Request, Response } from "express";
import Product from "../../repositories/product/product.repository";
import ApiError from "../../infra/apiErrors/ApiError";
export default class ProductController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await Product.findAll();
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    static async getByCategory(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const products = await Product.findByCategory(req.params.category);
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = JSON.parse(req.body.data);
            if (!req.files) throw new ApiError(400, "no files");
            const product = await Product.create({
                name: data.name,
                description: data.description,
                price: data.price,
                categories: data.category,
                inventory: data.inventory,
                images: (req.files as Array<Express.Multer.File>).map(
                    (file: Express.Multer.File) => file.path
                ),
            });
            return res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await Product.update(req.body);
            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id);
        try {
            const product = await Product.delete(id);
            return res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
}
