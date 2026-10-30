import { FindAllBooksApplicationService } from "./application/FindAllBooksApplicationService.js";
import { InMemoryCreateBookRepository } from "./infrastructure/InMemoryCreateBookRepository.js";
import {
  InMemoryBookRepository,
  type InMemoryBookRecord,
} from "./infrastructure/InMemoryBookRepository.js";
import { RegisterBookApplicationService } from "./application/RegisterBookApplicationService.js";

const books: InMemoryBookRecord[] = [
  {
    id: 1,
    title: "クリーンアーキテクチャ",
    isbn: "9784123456789",
  },
];

const bookRepository = new InMemoryBookRepository(books);
export const createBookRepository = new InMemoryCreateBookRepository(books);

export const findAllBooksApplicationService =
  new FindAllBooksApplicationService(bookRepository);

export const registerBookApplicationService =
  new RegisterBookApplicationService(bookRepository, createBookRepository);
