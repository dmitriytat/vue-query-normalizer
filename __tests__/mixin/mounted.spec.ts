/* tslint:disable:no-empty */
import { queryNormalizerMixin } from "../../src/mixin";
import { proceed } from "../../src/proceed";

jest.mock("../../src/proceed");

describe("Vue query normalizer", () => {
  describe("mounted", () => {
    it("should not call proceed", () => {
      const instance = {
        $options: {},
        $route: {
          query: {},
        },
      };

      // @ts-ignore
      proceed.mockImplementation(() => {});

      // @ts-ignore
      queryNormalizerMixin.mounted.call(instance);

      expect(proceed).not.toBeCalled();
    });

    it("should call proceed with check", () => {
      const instance = {
        $options: {
          query: {},
        },
        $route: {
          query: {},
        },
      };

      // @ts-ignore
      proceed.mockImplementation(() => {});

      // @ts-ignore
      queryNormalizerMixin.mounted.call(instance);

      expect(proceed).toBeCalledWith(instance.$options.query, instance.$route.query, true);
    });
  });
});
