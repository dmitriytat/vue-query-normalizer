import { checkValueType } from "../../src/utils";
import { NormalizerOption } from "../../types";

describe("Vue query normalizer", () => {
  describe("checkValueType", () => {
    it("should show warning if type error", () => {
      const key = "simple";

      const option: NormalizerOption<number> = {
        type: Number,
      };

      const value = "23";

      const spy = jest.spyOn(global.console, "warn");

      checkValueType(key, option, value);

      expect(spy).toHaveBeenCalledWith("Query type error!", key, value);
    });

    it("should not show warning", () => {
      const key = "simple";

      const option: NormalizerOption<number> = {
        type: Number,
      };

      const value = 23;

      const spy = jest.spyOn(global.console, "warn");

      checkValueType(key, option, value);

      expect(spy).not.toHaveBeenCalled();
    });

    it("should not show warning if has no value", () => {
      const key = "simple";

      const option: NormalizerOption<number> = {
        type: Number,
      };

      const spy = jest.spyOn(global.console, "warn");

      checkValueType(key, option, undefined);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
