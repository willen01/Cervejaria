import { Router } from "express";
import { BrweriesController } from "../brweries/controllers/BrweriesController";
import { createUserController, loginUserController } from "../users/UseCases";
import { auth } from "./auth/authToken";

const brweriesController = new BrweriesController();
const router = Router();

//cadastro de um novo usuário
router.post("/user", (request, response) => {
  return createUserController.create(request, response);
});

//login de um usuário já cadastrado
router.post("/login", (request, response) => {
  return loginUserController.login(request, response);
});

//lista cervejarias
router.get("/brweries", auth, brweriesController.main);

export { router };
