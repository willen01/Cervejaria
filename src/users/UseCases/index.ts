import { CreateUserController } from "../controllers/createUserController";
import { UserRepository } from "../repository/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
