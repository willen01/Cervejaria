import { User } from "../entities/User";
import { IUser } from "../protocols/User";
const Joi = require("@hapi/joi");

export class CreateUserUseCase {
  constructor(private userRepository: IUser) {}

  async create(user: User): Promise<void> {
    const fields = Joi.object({
      username: Joi.required(),
      password: Joi.required(),
    });

    await fields.validateAsync(user);

    const verifyUserExists = await this.userRepository.find(user.username);
    if (verifyUserExists != null) throw "user already exists";

    await this.userRepository.save(user);
  }
}
