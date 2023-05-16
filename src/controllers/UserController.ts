import { Request, Response } from "express";
import User from "../repositories/user/user.repository";

class UserController {

    static async index(req: Request, res: Response) {
        try {
            const users = await User.findUsers();

            return res.json({
                success: true,
                result: users
            })
        } catch (error) {
            console.log(error);
            return res
                 .status(500)
                 .json({ success: false, msg: "ops, deu ruim!"});
        }
    }
    
    static async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) return res
                .status(500)
                .json({success: false, msg: "É obrigatorio informar o ID do user!"});

            const user = await User.findUserById(Number(id));
            if (!user) return res
                .status(404)
                .json({success: false, msg: "User não encontrado para o ID informado!"});

           return res.json({
                success: true,
                result: user
            }); 
        } catch (error) {
            console.log(error);
            return res
                  .status(500)
                  .json({success: false, msg: "ops, deu ruim!"});
        }
    }

    static async buscarEmailAssinc(req: Request, res: Response) {
        try {
            const { email } = req.query;
            if (!email) return res
                .status(500)
                .json({success: false, msg: "É obrigatorio informar o Email do user!"});

            const user = await User.findUserByEmail(String(email));
            if (!user) return res
                .status(404)
                .json({success: false, msg: "User não encontrado para o endereço de email informado!"});

           return res.json({
                success: true,
                result: user
            }); 
        } catch (error) {
            console.log(error);
            return res
                  .status(500)
                  .json({success: false, msg: "ops, deu ruim!"});
        }
    }

    static async create(req: Request, res: Response) {
       
        try {
            const { name, email, password, role} = req.body;
            if(!name || !email || !password || !role) {
                return res
                  .status(500)
                  .json({success: false, msg: "informe todos os campos necessarios!"});
            };

            const user = await User.createUser({
                name,
                email,
                password,
                role
            });
            
            if (!user) {
                return res.json({
                success: false,
                message: "usuario não pode ser criado, porque ja existe.",
                result: user
               });
            }

            return res.json({
                    success: true,
                    message: "usuario criado com sucesso!",
                    result: user
               });

        } catch (error) {
            console.log(error);
            return res
                  .status(500)
                  .json({success: false, msg: "ops, deu ruim!"});
        }
    }

    static async update(req: Request, res: Response) {
       
        try {
            const { email, name, password, role} = req.body;
            if(!email && name && password && role) {
                return res
                  .status(500)
                  .json({success: false, msg: "endereço de email invalido!"});
            };

            const user = await User.updateUser({
                email,
                name,
                password,
                role
          });
            
            if (!user) {
                return res.json({
                success: false,
                message: "usuario não pode ser atualizado.",
                result: user
               });
            }

            return res.json({
                    success: true,
                    message: "usuario atualizado com sucesso!",
                    result: user
               });

        } catch (error) {
            console.log(error);
            return res
                  .status(500)
                  .json({success: false, msg: "ops, deu ruim!"});
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { email } = req.query;
            if (!email) return res
                .status(500)
                .json({success: false, msg: "É obrigatorio informar o Email do user!"});

            const user = await User.deleteUser(String(email));
            if (!user) return res
                .status(404)
                .json({success: false, msg: "User não encontrado para o endereço de email informado!"});

           return res.json({
                success: true,
                result: user,
                message: "Tarefa apagada com sucesso!"
            }); 
        } catch (error) {
            console.log(error);
            return res
                  .status(500)
                  .json({success: false, msg: "ops, deu ruim!"});
        }
    }

};

export default UserController;