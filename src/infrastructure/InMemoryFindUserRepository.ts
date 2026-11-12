import { User } from "../domain/entity/User.js";
import type { IFindUserRepository } from "../domain/repository/IFindUserRepository.js";

export class InMemoryFindUserRepository implements IFindUserRepository {
  constructor() {}

  async findById(id: number): Promise<User> {
    return new User(1, "山田");
  }
}
