/* tslint:disable:object-literal-sort-keys */
import { getValues } from "../../src/utils";
import { NormalizerOptions, NormalizerValues, RouteValue, RouteValues } from "../../types";

describe("Vue query normalizer", () => {
  describe("getValues", () => {
    it("should get values", () => {
      const options: NormalizerOptions = {
        simple: {
          type: String,
        },

        simple2: {},

        number: {
          type: Number,
        },

        number2: {
          type: Number,
        },
      };

      const query: RouteValues = {
        simple: "str",
        simple2: "str",
        number: "23",
      };

      const expected: NormalizerValues = {
        simple: "str",
        simple2: "str",
        number: 23,
      };

      expect(getValues(options, query)).toEqual(expected);
    });

    it("should set default values", () => {
      const options: NormalizerOptions = {
        simple: {
          type: String,
          default: "str",
        },

        number: {
          type: Number,
          default: 23,
        },

        array: {
          type: Array,
          default: () => [],
        },
      };

      const query: RouteValues = {};

      const expected: NormalizerValues  = {
        simple: "str",
        number: 23,
        array: [],
      };

      expect(getValues(options, query)).toEqual(expected);
    });

    it("should get values from custom converter", () => {
      const options: NormalizerOptions = {
        boolean: {
          type: Boolean,
          in: (value: RouteValue) => (value === "true"),
        },

        boolean2: {
          type: Boolean,
          in: (value: RouteValue) => (value === "true"),
        },
      };

      const query: RouteValues = {
        boolean: "true",
        boolean2: "false",
      };

      const expected: NormalizerValues = {
        boolean: true,
        boolean2: false,
      };

      expect(getValues(options, query)).toEqual(expected);
    });
  });
});
