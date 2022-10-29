import { User } from "../entities/User";
import { IUser } from "../protocols/User";

export class CreateUserUseCase {
  constructor(private userRepository: IUser) {}

  async create(user: User): Promise<void> {
    const verifyUserExists = await this.userRepository.find(user.username);
    if (verifyUserExists != null) throw "user already exists";

    await this.userRepository.save(user);
  }
}
