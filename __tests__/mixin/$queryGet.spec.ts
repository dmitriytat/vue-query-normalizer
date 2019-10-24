import { queryNormalizerMixin } from "../../src/mixin";
import { queryGet } from "../../src/utils";

jest.mock("../../src/utils");

describe("Vue query normalizer", () => {
  describe("$queryGet", () => {
    it("should return $route.query", () => {
      const instance = {
        $options: {},
        $route: {
          query: {},
        },
      };

      // @ts-ignore
      queryGet.mockImplementation(() => {
      });

      // @ts-ignore
      queryNormalizerMixin.methods.$queryGet.call(instance);

      expect(queryGet).not.toBeCalled();
    });

    it("should call proceed with check", () => {
      const instance = {
        $options: {
          query: {},
          queryHideDefaults: true,
        },
        $route: {
          query: {},
        },
        $query: {
          lol: 33,
        },
      };

      // @ts-ignore
      queryGet.mockImplementation(() => {
      });

      // @ts-ignore
      queryNormalizerMixin.methods.$queryGet.call(instance, { kek: 22 });

      expect(queryGet).toBeCalledWith(
        instance.$options.query, {
          kek: 22,
          lol: 33,
        },
        instance.$route.query,
        { queryHideDefaults: true },
      );
    });
  });
});
