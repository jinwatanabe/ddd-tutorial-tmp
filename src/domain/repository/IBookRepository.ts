import type { Book } from "../entity/Book.js";

export interface IBookRepository {
  findAll(): Promise<Book[]>;
}
