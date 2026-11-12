import type { User } from "../entity/User.js";

export interface IFindUserRepository {
  findById(id: number): Promise<User>;
}
