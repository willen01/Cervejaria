import { User } from "../entities/User";
import { IUser } from "../protocols/User";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prismaClient = new PrismaClient();

export class UserRepository implements IUser {
  async find(username: string): Promise<User | null> {
    const findUser = await prismaClient.user.findUnique({
      where: { username },
    });
    return findUser;
  }

  async save(user: User): Promise<void> {
    await prismaClient.user.create({
      data: { ...user, password: bcrypt.hashSync(user.password, 10) },
    });
  }
}
