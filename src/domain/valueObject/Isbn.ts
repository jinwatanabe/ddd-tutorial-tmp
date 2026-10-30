export class Isbn {
  constructor(private readonly value: string) {
    if (value.length !== 13) {
      throw new Error("ISBNは13桁である必要があります");
    }

    if (!/^\d+$/.test(value)) {
      throw new Error("ISBNは数字である必要があります");
    }
  }

  getValue(): string {
    return this.value;
  }
}
