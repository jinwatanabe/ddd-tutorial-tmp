import { randomUUID } from "crypto";
import type { ICreateBookRepository } from "../domain/repository/ICreateBookRepository.js";
import { Isbn } from "../domain/valueObject/Isbn.js";
import { Book } from "../domain/entity/Book.js";
import type { IBookRepository } from "../domain/repository/IBookRepository.js";
import { BookDomainService } from "../domain/service/BookDomainService.js";

export class RegisterBookApplicationService {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly createBookRepository: ICreateBookRepository,
  ) {}

  async execute(title: string, isbn: string): Promise<BookDto> {
    const books = await this.bookRepository.findAll();
    const book = new Book(books.length + 1, title, new Isbn(isbn));

    const isDuplicated = BookDomainService.isDuplicated(books, book);
    if (isDuplicated) {
      throw new Error("同じ本は登録できない");
    }

    const createBook = await this.createBookRepository.create(book);

    return {
      id: createBook.id,
      title: createBook.title,
      isbn: createBook.isbn.getValue(),
    };
  }
}

type BookDto = {
  id: number;
  title: string;
  isbn: string;
};
