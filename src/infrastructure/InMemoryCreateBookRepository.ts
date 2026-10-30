import type { Book } from "../domain/entity/Book.js";
import type { ICreateBookRepository } from "../domain/repository/ICreateBookRepository.js";
import type { InMemoryBookRecord } from "./InMemoryBookRepository.js";

export class InMemoryCreateBookRepository implements ICreateBookRepository {
  constructor(private readonly books: InMemoryBookRecord[]) {}

  async create(book: Book): Promise<Book> {
    this.books.push({
      id: book.id,
      title: book.title,
      isbn: book.getIsbn(),
    });

    return book;
  }
}
