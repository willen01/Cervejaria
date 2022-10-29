import { Router } from "express";
import { createUserController, loginUserController } from "../users/UseCases";

const router = Router();

//cadastro de um novo usuário
router.post("/user", (request, response) => {
  return createUserController.create(request, response);
});

//login de um usuário já cadastrado
router.post("/login", (request, response) => {
  return loginUserController.login(request, response);
});

export { router };
