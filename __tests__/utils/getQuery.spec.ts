/* tslint:disable:object-literal-sort-keys */
import { getQuery } from "../../src/utils";
import { NormalizerOptions, NormalizerValues } from "../../types";

describe("Vue query normalizer", () => {
  describe("getQuery", () => {
    it("should get params", () => {
      const options: NormalizerOptions = {
        simple: {
          type: String,
        },

        number: {
          type: Number,
        },

        number2: {
          type: Number,
        },
      };

      const params = {
        simple: "str",
        number: 23,
        number2: 23,
      };

      const oldQuery = {
        old: "old",
      };

      const expected = {
        simple: "str",
        number: "23",
        number2: "23",
        old: "old",
      };

      expect(getQuery(options, params, oldQuery)).toEqual(expected);
    });

    it("should get params with default values", () => {
      const options: NormalizerOptions = {
        simple: {
          type: String,
          default: "str",
        },

        number: {
          type: Number,
          default: 23,
        },
      };

      const params = {
        simple: "str",
        number: 23,
      };

      const oldQuery = {};

      const expected = {};

      expect(getQuery(options, params, oldQuery)).toEqual(expected);
    });

    it("should not remove old", () => {
      const options: NormalizerOptions = {
        simple: {
          type: String,
          default: "str",
        },
      };

      const params = {
        simple: "str",
      };

      const oldQuery = {
        old: "old",
      };

      const expected = {
        old: "old",
      };

      expect(getQuery(options, params, oldQuery)).toEqual(expected);
    });

    it("should get params with custom compareWithDefault", () => {
      const options: NormalizerOptions = {
        array: {
          type: Array,
          default: () => [123],
          compare: (value, defaultValue) => String(value) === String(defaultValue),
        },

        array2: {
          type: Array,
          default: () => [123],
          out: (value) => value.join(","),
          compare: (value, defaultValue) => String(value) === String(defaultValue),
        },
      };

      const params = {
        array: [123],
        array2: [1234, 5678],
      };

      const oldQuery = {};

      const expected = {
        array2: "1234,5678",
      };

      expect(getQuery(options, params, oldQuery)).toEqual(expected);
    });

    it("should delete falsy values", () => {
      const options: NormalizerOptions = {
        simple: {
          type: String,
        },

        number: {
          type: Number,
        },

        number2: {
          type: Number,
        },
      };

      const params: NormalizerValues = {
        simple: undefined,
        number: null,
        number2: false,
      };

      const expected = {};

      expect(getQuery(options, params)).toEqual(expected);
    });
  });
});
