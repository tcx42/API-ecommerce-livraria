import { NextFunction, Request, Response } from "express";
import UserRepository from "../../repositories/user/user.repository";
import ApiError from "../../infra/apiErrors/ApiError";
import Encryption from "../../core/utils/encryption";
import Jwtoken from "../../core/utils/jwtoken";

export default class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserRepository.findUserByEmail(email, true);
      if (!user) throw new ApiError(404, "Usuário não encontrado.");
      if (!Encryption.isPasswordValid(password, user.password)) {
        throw new ApiError(400, "Credenciais inválidas.");
      }
      const token = Jwtoken.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
      const refreshtoken = Jwtoken.generateRefreshToken(email);
      res.cookie("jsonwebtoken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("jsonwebtoken");
      res.clearCookie("refreshtoken");
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserRepository.findUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserRepository.findUserById(parseInt(id));
      if (!user) {
        throw new ApiError(404, "Usuário não encontrado para o ID informado!");
      }
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const user = await UserRepository.findUserByEmail(email);
      if (!user) {
        throw new ApiError(
          404,
          "Usuário não encontrado para o endereço de email informado!",
        );
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserRepository.createUser({
        name,
        email,
        password,
        role: "admin",
      });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserRepository.createUser({
        name,
        email,
        password,
        role: "client",
      });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      const { name, password } = req.body;
      const user = await UserRepository.updateUser({
        email,
        name,
        password,
      });
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.params;
      await UserRepository.deleteUser(email);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
