import { CreateUserController } from "../controllers/createUserController";
import { LoginUserController } from "../controllers/LoginUserController";
import { UserRepository } from "../repository/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { LoginUserUseCase } from "./LoginUseCase";

//instância da implementação concreta do banco;
const userRepository = new UserRepository();

//instâncias dos casos de uso da aplicação
const createUserUseCase = new CreateUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(userRepository);

//instâncias dos controllers da aplicação
const createUserController = new CreateUserController(createUserUseCase);
const loginUserController = new LoginUserController(loginUseCase);

export { createUserController, loginUserController };
