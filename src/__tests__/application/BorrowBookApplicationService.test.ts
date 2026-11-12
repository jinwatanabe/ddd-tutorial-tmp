import { describe, expect, it } from "vitest";
import { BorrowBookApplicationService } from "../../application/BorrowBookApplicationService.js";
import { User } from "../../domain/entity/User.js";
import { Book } from "../../domain/entity/Book.js";
import { Isbn } from "../../domain/valueObject/Isbn.js";

describe("BorrowBookApplicationService", () => {
  it("本を借りる", async () => {
    const expected = {
      bookTitle: "ドメイン駆動設計",
      userName: "山田",
    };

    const userId = 1;
    const bookId = 1;

    const user = new User(1, "山田");

    const userRepository = {
      findById: async () => {
        return user;
      },
    };

    const books = [
      new Book(1, "ドメイン駆動設計", new Isbn("1234567890123")),
      new Book(2, "タイトル2", new Isbn("1234567890124")),
      new Book(3, "タイトル3", new Isbn("1234567890125")),
    ];

    const bookRepository = {
      findAll: async () => {
        return books;
      },
    };

    const service = new BorrowBookApplicationService(
      userRepository,
      bookRepository,
    );
    const result = await service.execute(userId, bookId);

    expect(result).toEqual(expected);
  });
});
