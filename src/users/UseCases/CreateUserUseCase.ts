import { User } from "../entities/User";
import { IUser } from "../protocols/User";
const Joi = require("@hapi/joi");

export class CreateUserUseCase {
  constructor(private userRepository: IUser) {}

  //valida se os campos enviados pelo usuário não estão vazios
  async create(user: User): Promise<void> {
    const fields = Joi.object({
      username: Joi.required(),
      password: Joi.required(),
    });

    await fields.validateAsync(user);

    //verifica no banco se já existe um usuário cadastrado com o mesmo username
    const verifyUserExists = await this.userRepository.find(user.username);
    if (verifyUserExists != null) throw "user already exists";

    //salva os dados
    await this.userRepository.save(user);
  }
}
