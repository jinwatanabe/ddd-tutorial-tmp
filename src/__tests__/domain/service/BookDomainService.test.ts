import { describe, expect, it } from "vitest";
import { BookDomainService } from "../../../domain/service/BookDomainService.js";
import { Book } from "../../../domain/entity/Book.js";
import { Isbn } from "../../../domain/valueObject/Isbn.js";

describe("BookDomainService", () => {
  it("同じ本は登録できない", () => {
    const books = [new Book(1, "DDD", new Isbn("1111111111111"))];
    const book = new Book(2, "DDD", new Isbn("1111111111111"));

    const actual = BookDomainService.isDuplicated(books, book);
    expect(actual).toBe(true);
  });

  it("異なる本は登録できる", () => {
    const books = [new Book(1, "DDD", new Isbn("1111111111111"))];
    const book = new Book(2, "DDD", new Isbn("2222222222222"));

    const actual = BookDomainService.isDuplicated(books, book);
    expect(actual).toBe(false);
  });
});
