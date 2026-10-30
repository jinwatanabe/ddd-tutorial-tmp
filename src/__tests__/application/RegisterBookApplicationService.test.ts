import { describe, expect, it } from "vitest";
import { RegisterBookApplicationService } from "../../application/RegisterBookApplicationService.js";
import { Isbn } from "../../domain/valueObject/Isbn.js";
import { Book } from "../../domain/entity/Book.js";

describe("RegisterBookApplicationService", () => {
  it("本を登録する", async () => {
    const expected = { id: 2, title: "DDD", isbn: "1111111111111" };
    const title = "DDD";
    const isbn = "1111111111111";

    const createBookRepository = {
      create: async () => new Book(2, title, new Isbn(isbn)),
    };

    const bookRepository = {
      findAll: async () => [new Book(1, title, new Isbn("2222222222222"))],
    };

    const applicationService = new RegisterBookApplicationService(
      bookRepository,
      createBookRepository,
    );
    const actual = await applicationService.execute(title, isbn);
    expect(actual).toEqual(expected);
  });

  it("同じ本は登録できない", async () => {
    const title = "DDD";
    const isbn = "1111111111111";

    const bookRepository = {
      findAll: async () => [new Book(1, title, new Isbn(isbn))],
    };

    const createBookRepository = {
      create: async () => {
        throw new Error("ここは呼ばれない");
      },
    };

    const applicationService = new RegisterBookApplicationService(
      bookRepository,
      createBookRepository,
    );

    await expect(applicationService.execute(title, isbn)).rejects.toThrow(
      "同じ本は登録できない",
    );
  });
});
