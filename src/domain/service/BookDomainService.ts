import type { Book } from "../entity/Book.js";

const isDuplicated = (books: Book[], book: Book) => {
  return books.some((b) => b.isbn.getValue() === book.isbn.getValue());
};

export const BookDomainService = {
  isDuplicated,
};
