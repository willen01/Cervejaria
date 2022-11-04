import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prismaClient = new PrismaClient();

type userNamePayload = {
  username: string;
};

export async function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "access denied" }); //retorna uma mensagem de acesso negado caso o usuário envie um token
  }

  const [, token] = authorization.split(" ");

  try {
    jwt.verify(token, process.env.JWT_SECRET as string); //valida o token enviado pelo usuário
    const { username } = jwt.decode(token) as userNamePayload; //extrai o username do token enviado pelo usuário.
    const user = await prismaClient.user.findUnique({ where: { username } }); //busca usuário no banco.
    if (user == null) throw new Error(); //força erro caso o usuário não exista no banco
    next();
  } catch (error) {
    res.status(403).json({ error: "invalid token" });
  }
}
