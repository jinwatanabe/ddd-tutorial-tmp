import { describe, expect, it } from "vitest";
import { Isbn } from "../../../domain/valueObject/Isbn.js";

describe("Isbn", () => {
  it("ISBNは13桁の数字であること", () => {
    const actual = new Isbn("1234567890123");
    expect(actual).toBeInstanceOf(Isbn);
  });

  it("ISBNが13桁のでない場合はエラーになる", () => {
    expect(() => new Isbn("12345678901234")).toThrow();
  });

  it("ISBNが数字でない場合はエラーになる", () => {
    expect(() => new Isbn("123456789012a")).toThrow();
  });

  it("ISBNを取得できる", () => {
    const isbn = new Isbn("1234567890123");
    expect(isbn.getValue()).toEqual("1234567890123");
  });
});
