import { NextFunction, Request, Response } from "express";
import CartRepository from "../../repositories/cart/cart.repository";
import ApiError from "../../infra/apiErrors/ApiError";

export default class CartController {
  static async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, quantity } = req.body;
      const user = req.user;
      if (!user) throw new ApiError(404, "Usuário não encontrado");
      const cart = await CartRepository.findCartByUserId(user.id);
      if (!cart) {
        await CartRepository.createCart(user.id);
      }
      const existingProduct = await CartRepository.findProductInUserCart(
        user.id,
        productId,
      );
      if (existingProduct) {
        await CartRepository.updateProductQuantity(
          existingProduct.id,
          quantity,
        );
        return res.sendStatus(204);
      } else {
        await CartRepository.addProductToCart(user.id, productId, quantity);
        return res.sendStatus(201);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getCartWithProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.user?.id;
      if (!id) throw new ApiError(404, "Usuário não encontrado");
      const cart = await CartRepository.getCartByUser(id);
      if (!cart) {
        throw new ApiError(404, "Carrinho não encontrado.");
      }
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;
      const user = req.user;
      if (!user) {
        throw new ApiError(404, "Usuário não encontrado.");
      }
      const cart = await CartRepository.findCartByUserId(user.id);
      if (!cart) {
        throw new ApiError(404, "Carrinho não encontrado.");
      }
      const existingProduct = await CartRepository.findProductInUserCart(
        user.id,
        productId,
      );
      if (!existingProduct) {
        throw new ApiError(404, "Produto não encontrado no carrinho.");
      }
      await CartRepository.removeProductFromCart(existingProduct.id);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
