/* tslint:disable:object-literal-sort-keys */
import { isEqualDefault } from "../../src/utils";
import { NormalizerOption } from "../../types";

describe("Vue query normalizer", () => {
  describe("isEqualDefault", () => {
    it("should compare simple value", () => {
      expect(isEqualDefault({ default: 23 } as NormalizerOption<number>, 23)).toBeTruthy();
      expect(isEqualDefault({ default: 23 } as NormalizerOption<number>, 45)).toBeFalsy();

      expect(isEqualDefault({ default: "hello" } as NormalizerOption<string>, "hello")).toBeTruthy();
      expect(isEqualDefault({ default: "hello" } as NormalizerOption<string>, "hi")).toBeFalsy();

      expect(isEqualDefault({ default: true } as NormalizerOption<boolean>, true)).toBeTruthy();
      expect(isEqualDefault({ default: false } as NormalizerOption<boolean>, true)).toBeFalsy();
    });

    it("should compare with custom default", () => {
      const option: NormalizerOption<string> = {
        default: () => "hi",
      };

      expect(isEqualDefault(option, "hi")).toBeTruthy();
    });

    it("should compare with custom compare", () => {
      const option: NormalizerOption<string[]> = {
        default: ["hello"],
        compare: (value, defaultValue) => String(value) === String(defaultValue),
      };

      expect(isEqualDefault(option, ["hello"])).toBeTruthy();
    });

    it("should compare with custom default and compare", () => {
      const option: NormalizerOption<string[]> = {
        default: () => ["hi"],
        compare: (value, defaultValue) => String(value) === String(defaultValue),
      };

      expect(isEqualDefault(option, ["hi"])).toBeTruthy();
    });
  });
});
