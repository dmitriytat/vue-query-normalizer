/* tslint:disable:object-literal-sort-keys */
import { compareWithDefault } from "../../src/utils";
import { NormalizerOption } from "../../types";

describe("Vue query normalizer", () => {
  describe("compareWithDefault", () => {
    it("should compare simple value", () => {
      expect(compareWithDefault({ default: 23 } as NormalizerOption<number>, 23)).toBeTruthy();
      expect(compareWithDefault({ default: 23 } as NormalizerOption<number>, 45)).toBeFalsy();

      expect(compareWithDefault({ default: "hello" } as NormalizerOption<string>, "hello")).toBeTruthy();
      expect(compareWithDefault({ default: "hello" } as NormalizerOption<string>, "hi")).toBeFalsy();

      expect(compareWithDefault({ default: true } as NormalizerOption<boolean>, true)).toBeTruthy();
      expect(compareWithDefault({ default: false } as NormalizerOption<boolean>, true)).toBeFalsy();
    });

    it("should compare with custom default", () => {
      const option: NormalizerOption<string> = {
        default: () => "hi",
      };

      expect(compareWithDefault(option, "hi")).toBeTruthy();
    });

    it("should compare with custom compare", () => {
      const option: NormalizerOption<string[]> = {
        default: ["hello"],
        compare: (value, defaultValue) => String(value) === String(defaultValue),
      };

      expect(compareWithDefault(option, ["hello"])).toBeTruthy();
    });

    it("should compare with custom default and compare", () => {
      const option: NormalizerOption<string[]> = {
        default: () => ["hi"],
        compare: (value, defaultValue) => String(value) === String(defaultValue),
      };

      expect(compareWithDefault(option, ["hi"])).toBeTruthy();
    });
  });
});
