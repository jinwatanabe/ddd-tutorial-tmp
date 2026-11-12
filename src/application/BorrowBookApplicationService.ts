import { BorrowList } from "../domain/aggregate/BorrowList.js";
import type { IBookRepository } from "../domain/repository/IBookRepository.js";
import type { IFindUserRepository } from "../domain/repository/IFindUserRepository.js";

export class BorrowBookApplicationService {
  constructor(
    private readonly userRepository: IFindUserRepository,
    private readonly bookRepository: IBookRepository,
  ) {}

  async execute(userId: number, bookId: number): Promise<BorrowBookDto> {
    const user = await this.userRepository.findById(userId);
    const books = await this.bookRepository.findAll();

    const borrowBook = books.find((book) => book.id === bookId);

    if (!borrowBook) {
      throw new Error("借りられる本が見つかりませんでした");
    }

    const borrowList = new BorrowList([]); // DBからとる
    if (!borrowList.isBorrowable(user, borrowBook)) {
      throw new Error("貸し出し可能な本がありません");
    }

    return {
      bookTitle: borrowBook.title,
      userName: user.name,
    };
  }
}

type BorrowBookDto = {
  bookTitle: string;
  userName: string;
};
