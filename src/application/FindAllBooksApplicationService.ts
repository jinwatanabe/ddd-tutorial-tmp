import type { IBookRepository } from "../domain/repository/IBookRepository.js";

export class FindAllBooksApplicationService {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(): Promise<BookDto[]> {
    const books = await this.bookRepository.findAll();
    return books.map((book) => ({
      id: book.id,
      title: book.title,
      isbn: book.getIsbn(),
    }));
  }
}

type BookDto = {
  id: number;
  title: string;
  isbn: string;
};
