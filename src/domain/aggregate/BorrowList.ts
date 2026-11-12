import type { Book } from "../entity/Book.js";
import { User } from "../entity/User.js";
import type { Borrow } from "./Borrow.js";

export class BorrowList {
  constructor(public readonly borrows: Borrow[]) {}

  isBorrowable(user: User, book: Book) {
    if (
      this.borrows.some((borrow) => borrow.books.some((b) => b.id === book.id))
    ) {
      return false;
    }

    const userBorrow = this.borrows.find((borrow) => borrow.userId === user.id);

    if (userBorrow) {
      return userBorrow.books.length < 3;
    }

    return true;
  }
}
