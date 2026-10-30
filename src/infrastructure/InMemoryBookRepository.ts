import { Book } from "../domain/entity/Book.js";
import type { IBookRepository } from "../domain/repository/IBookRepository.js";
import { Isbn } from "../domain/valueObject/Isbn.js";

export type InMemoryBookRecord = {
  id: number;
  title: string;
  isbn: string;
};

export class InMemoryBookRepository implements IBookRepository {
  constructor(private readonly books: InMemoryBookRecord[]) {}

  async findAll(): Promise<Book[]> {
    return this.books.map(
      (book) => new Book(book.id, book.title, new Isbn(book.isbn)),
    );
  }
}
