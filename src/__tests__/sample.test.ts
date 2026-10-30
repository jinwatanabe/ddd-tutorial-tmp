import { describe, expect, it } from "vitest";

function sum(a: number, b: number) {
  return a + b;
}

describe('sum', () => {
  it('2つの数字を足して返す', () => {
    expect(sum(1, 2)).toBe(3)
  })
})