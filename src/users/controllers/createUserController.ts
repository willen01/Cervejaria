import { Request, Response } from "express";
import { CreateUserUseCase } from "../UseCases/CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    try {
      await this.createUserUseCase.create({
        username,
        password,
      });
      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}
