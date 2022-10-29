import { Router } from "express";
import { createUserController } from "../users/UseCases";

const router = Router();

router.post("/user", (request, response) => {
  return createUserController.create(request, response);
});

export { router };
