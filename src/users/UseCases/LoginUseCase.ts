import { User } from "../entities/User";
import { UserRepository } from "../repository/UserRepository";
import bcrypt from "bcryptjs";
const Joi = require("@hapi/joi");

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async login(user: User) {
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
  }
}
