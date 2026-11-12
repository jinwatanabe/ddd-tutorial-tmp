import type { Book } from "../entity/Book.js";
import type { User } from "../entity/User.js";

export class Borrow {
  constructor(
    public readonly user: User,
    public readonly books: Book[],
  ) {}

  get userId() {
    return this.user.id;
  }
}
