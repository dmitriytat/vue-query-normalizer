import { isEqualQuery } from "../../src/utils";

describe("Vue query normalizer", () => {
  describe("isEqualQuery", () => {
    it("should patch has new values", () => {
      expect(isEqualQuery({ a: {} }, { a: "1" }, { a: "1", b: "2" })).toBe(true);
    });

    it("should patch has not new values", () => {
      expect(isEqualQuery({ a: {} }, { a: "1" }, { b: "2" })).toBe(false);
    });
  });
});
