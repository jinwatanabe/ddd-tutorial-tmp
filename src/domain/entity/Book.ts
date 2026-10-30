import { Isbn } from "../valueObject/Isbn.js";

export class Book {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly isbn: Isbn,
  ) {}

  getIsbn(): string {
    return this.isbn.getValue();
  }
}