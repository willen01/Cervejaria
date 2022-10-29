import { User } from "../entities/User";

export interface IUser {
  save(user: User): Promise<void>;
  find(id: string): Promise<User | null>;
}
