import { Router } from "express";
import { BreweriesController } from "../breweries/controllers/BreweriesController";
import { createUserController, loginUserController } from "../users/UseCases";
import { auth } from "./auth/authToken";

const breweriesController = new BreweriesController();
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
router.get("/breweries", auth, breweriesController.main);

export { router };
