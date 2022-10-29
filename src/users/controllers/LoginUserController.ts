import { Request, Response } from "express";
import { LoginUserUseCase } from "../UseCases/LoginUseCase";

export class LoginUserController {
  constructor(private loginUseCase: LoginUserUseCase) {}
  async login(request: Request, response: Response) {
    const { username, password } = request.body;
    try {
      await this.loginUseCase.login({ username, password });
      return response.status(200).send();
    } catch (error) {
      return response.status(200).json({ error });
    }
  }
}
