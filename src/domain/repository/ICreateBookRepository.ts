import type { Book } from "../entity/Book.js";

export interface ICreateBookRepository {
  create(book: Book): Promise<Book>;
}
