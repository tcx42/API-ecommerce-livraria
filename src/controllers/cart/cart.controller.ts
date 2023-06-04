import { NextFunction, Request, Response } from "express";
import CartRepository from "../../repositories/cart/cart.repository";
import { PrismaClient } from "@prisma/client";
import ApiError from "../../infra/apiErrors/ApiError";

const prisma = new PrismaClient();

export default class CartController {
    
  static async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { userEmail, productId, quantity } = req.body;
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true },
      });
      if (!user) throw new ApiError(404, "Usuário não encontrado.");

      // Verificar se o carrinho do usuário já existe
      const cart = await CartRepository.findCartByUserId(user.id);

      if (!cart) {
        // Criar um novo carrinho para o usuário
        await CartRepository.createCart(user.id);
      }

      // Verificar se o produto já existe no carrinho do usuário
      const existingProduct = await CartRepository.findProductInUserCart(
        user.id,
        productId
      );

      if (existingProduct) {
        // Atualizar a quantidade do produto existente no carrinho
        await CartRepository.updateProductQuantity(existingProduct.id, quantity);
        return res.sendStatus(204);
      } else {
        // Adicionar um novo produto ao carrinho
        await CartRepository.addProductToCart(user.id, productId, quantity);
        return res.sendStatus(201);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getCartWithProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { cartId } = req.params;
  
      // Obtém o ID do carrinho da requisição
  
      const cart = await CartRepository.getCartWithProducts(parseInt(cartId));
  
      // Chama o método do CartRepository para obter o carrinho com os produtos
  
      if (!cart) {
        // Se o carrinho não for encontrado, lança um erro
        throw new ApiError(404, "Carrinho não encontrado.");
      }
  
      // Retorna o carrinho como resposta da requisição com status 200 e o JSON com os dados
  
      res.status(200).json(cart);
    } catch (error) {
      // Captura e repassa o erro para o próximo middleware de tratamento de erros
      next(error);
    }
  }
  

  static async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { userEmail, productId } = req.body;
  
      // Obtém o email do usuário e o ID do produto a ser removido do corpo da requisição
  
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true },
      });
  
      // Procura o usuário pelo email no banco de dados
  
      if (!user) {
        // Se o usuário não for encontrado, lança um erro
        throw new ApiError(404, "Usuário não encontrado.");
      }
  
      const cart = await CartRepository.findCartByUserId(user.id);
  
      // Procura o carrinho do usuário pelo ID do usuário
  
      if (!cart) {
        // Se o carrinho não for encontrado, lança um erro
        throw new ApiError(404, "Carrinho não encontrado.");
      }
  
      const existingProduct = await CartRepository.findProductInUserCart(
        user.id,
        productId
      );
  
      // Verifica se o produto existe no carrinho do usuário
  
      if (!existingProduct) {
        // Se o produto não for encontrado no carrinho, lança um erro
        throw new ApiError(404, "Produto não encontrado no carrinho.");
      }
  
      await CartRepository.removeProductFromCart(existingProduct.id);
  
      // Remove o produto do carrinho
  
      return res.sendStatus(204);
      // Retorna um status 204 (No Content) indicando que a remoção foi bem sucedida
    } catch (error) {
      // Captura e repassa o erro para o próximo middleware de tratamento de erros
      next(error);
    }
  }
}
