import { describe, expect, it } from "vitest";
import { User } from "../../../domain/entity/User.js";
import { Book } from "../../../domain/entity/Book.js";
import { Isbn } from "../../../domain/valueObject/Isbn.js";
import { BorrowList } from "../../../domain/aggregate/BorrowList.js";
import { Borrow } from "../../../domain/aggregate/Borrow.js";

describe("Borrow", () => {
  it("3冊以内の本を借りられる", () => {
    const user = new User(1, "山田");
    const book = new Book(1, "ドメイン駆動設計", new Isbn("1234567890123"));

    const borrowList = new BorrowList([]);
    const result = borrowList.isBorrowable(user, book);
    expect(result).toBe(true);
  });

  it("3冊以上の本を借りられない", () => {
    const user = new User(1, "山田");
    const book = new Book(1, "ドメイン駆動設計", new Isbn("1234567890123"));

    const books = [
      new Book(1, "ドメイン駆動設計", new Isbn("1234567890123")),
      new Book(2, "タイトル2", new Isbn("1234567890124")),
      new Book(3, "タイトル3", new Isbn("1234567890125")),
    ];
    const borrows = [new Borrow(user, books)];

    const borrowList = new BorrowList(borrows);
    const result = borrowList.isBorrowable(user, book);
    expect(result).toBe(false);
  });

  it("貸出中の本は貸し出せない", () => {
    const user = new User(1, "山田");
    const user2 = new User(2, "佐藤");
    const book = new Book(1, "ドメイン駆動設計", new Isbn("1234567890123"));

    const borrows = [new Borrow(user2, [book])];
    const borrowList = new BorrowList(borrows);

    const result = borrowList.isBorrowable(user, book);
    expect(result).toBe(false);
  });
});
