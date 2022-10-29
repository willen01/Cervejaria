import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { IUser } from "../protocols/User";
const Joi = require("@hapi/joi");

export class LoginUserUseCase {
  constructor(private userRepository: IUser) {}
  async login(user: User): Promise<string> {
    //valida se os campos enviados pelo usuário não estão vazios
    const fields = Joi.object({
      username: Joi.required(),
      password: Joi.required(),
    });

    await fields.validateAsync(user);

    //verifica se o login passado corresponse com o armazenado no banco
    const findUser = await this.userRepository.find(user.username);
    if (findUser == null) {
      throw "email incorrect";
    }

    //valida se o password recebido é compatível com o hash armazenado no banco
    const validatePassword = bcrypt.compareSync(
      user.password,
      findUser.password
    );
    if (!validatePassword) throw "password incorrect";

    //gera um token jwt com base no segredo da aplicação. esse token será enviado para o usuário
    const token = jwt.sign(
      { username: findUser.username },
      process.env.JWT_SECRET as string
    );
    return token;
  }
}
