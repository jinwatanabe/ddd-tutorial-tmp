import { describe, expect, it } from "vitest";
import { Isbn } from "../../../domain/valueObject/Isbn.js";
import { Book } from "../../../domain/entity/Book.js";

describe("Book", () => {
  it("ISBNを取得できる", () => {
    const expected = "1234567890123";
    const book = new Book(1, "Book 1", new Isbn("1234567890123"));
    const actual = book.getIsbn();
    expect(actual).toEqual(expected);
  });
});
