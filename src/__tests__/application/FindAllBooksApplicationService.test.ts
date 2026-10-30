import { describe, expect, it } from "vitest";
import { FindAllBooksApplicationService } from "../../application/FindAllBooksApplicationService.js";
import { Book } from "../../domain/entity/Book.js";
import { Isbn } from "../../domain/valueObject/Isbn.js";

describe("FindAllBooksApplicationService", () => {
  it("本の一覧を取得する", async () => {
    const expected = [
      {
        id: 1,
        title: "Book 1",
        isbn: "1234567890123",
      },
      {
        id: 2,
        title: "Book 2",
        isbn: "1234567890124",
      },
    ];
    const bookRepository = {
      findAll: async () => {
        return [
          new Book(1, "Book 1", new Isbn("1234567890123")),
          new Book(2, "Book 2", new Isbn("1234567890124")),
        ];
      },
    };
    const service = new FindAllBooksApplicationService(bookRepository);
    const result = await service.execute();
    expect(result).toEqual(expected);
  });
});
