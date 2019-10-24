import {proceed} from "../../src/proceed";
import {NormalizerOptions} from "../../types";

import * as utils from "../../src/utils";
jest.mock("../../src/utils");

describe("Vue query normalizer", () => {
    describe("proceed", () => {
        it("should set _query and call queryReady", () => {
            const instance = {
                $options: {
                    query: {},
                    queryReady: jest.fn(() => undefined),
                },
                $queryGet: jest.fn(() => ({ test: "test" })),
                $router: {
                    replace: jest.fn(() => undefined),
                },
                _query: {},
            };

            const options: NormalizerOptions = {
                test: {
                    type: String,
                },
            };

            // @ts-ignore
            utils.getValues.mockImplementation(() => ({ value: "value"}));
            // @ts-ignore
            utils.isEqualQuery.mockImplementation(() => "overridden");

            // @ts-ignore
            proceed.call(instance, options);

            expect(instance._query).toEqual({ value: "value"});
            expect(instance.$options.queryReady).toHaveBeenCalled();
        });

        it("should check, set _query and call queryReady", () => {
            const instance = {
                $options: {
                    query: {},
                    queryReady: jest.fn(() => undefined),
                },
                $queryGet: jest.fn(() => ({ test: "test" })),
                $route: {
                    query: { value: "value"},
                },
                $router: {
                    replace: jest.fn(() => undefined),
                },
                _query: {},
            };

            const options: NormalizerOptions = {
                test: {
                    type: String,
                },
            };

            // @ts-ignore
            utils.getValues.mockImplementation(() => ({ value: "value"}));
            // @ts-ignore
            utils.isEqualQuery.mockImplementation(() => true);

            // @ts-ignore
            proceed.call(instance, options, {}, true);

            expect(instance._query).toEqual({ value: "value"});
            expect(instance.$options.queryReady).toHaveBeenCalled();
        });

        it("should check, not set _query and replace route", () => {
            const instance = {
                $options: {
                    query: {},
                    queryReady: jest.fn(() => undefined),
                },
                $queryGet: jest.fn(() => ({ test: "test" })),
                $route: {
                    query: { value: "value2" },
                },
                $router: {
                    replace: jest.fn(() => undefined),
                },
                _query: {},
            };

            const options: NormalizerOptions = {
                test: {
                    type: String,
                },
            };

            // @ts-ignore
            utils.getValues.mockImplementation(() => ({ value: "value"}));
            // @ts-ignore
            utils.isEqualQuery.mockImplementation(() => false);

            // @ts-ignore
            proceed.call(instance, options, {}, true);

            expect(instance.$router.replace).toHaveBeenCalledWith({ query: { test: "test" } });
            expect(instance._query).toEqual({});
            expect(instance.$options.queryReady).not.toHaveBeenCalled();
        });
    });
});
