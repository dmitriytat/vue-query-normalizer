import { queryNormalizerMixin } from "../../src/mixin";

describe("Vue query normalizer", () => {
  describe("beforeCreate", () => {
    it("should create $query property", () => {
      const instance = {
        $options: {
          query: {},
        },
      };

      // @ts-ignore
      expect(instance._query).toEqual(undefined);
      // @ts-ignore
      expect(instance.$query).toEqual(undefined);

      // @ts-ignore
      queryNormalizerMixin.beforeCreate.call(instance);

      // @ts-ignore
      expect(instance._query).toEqual({});
      // @ts-ignore
      expect(instance.$query).toEqual({});
    });
  });
});
