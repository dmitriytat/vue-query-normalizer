/* tslint:disable:no-console max-line-length */
import Vue from "vue";

import {
  LocationValues,
  NormalizerOption,
  NormalizerOptions,
  NormalizerValue,
  NormalizerValues,
  RouteValues,
} from "../types/normalizer";

export function isEqualQuery(options: NormalizerOptions, patch: LocationValues, query: RouteValues): boolean {
  return Object.keys(options).every((key) => String(patch[key]) === String(query[key]));
}

export function checkValueType(key: string, option: NormalizerOption<NormalizerValue>, value?: NormalizerValue) {
  const hasTypeAndValue = typeof option.type !== "undefined" && typeof value !== "undefined";

  if (hasTypeAndValue) {
    // @ts-ignore
    const isInstanceOfType = Object(value) instanceof option.type;

    if (!isInstanceOfType) {
      console.warn("Query type error!", key, value);
    }
  }
}

export function compareWithDefault(this: Vue | void, option: NormalizerOption<NormalizerValue>, rawValue: NormalizerValue): boolean {
  let defaultValue: NormalizerValue;

  if (typeof option.default === "function") {
    defaultValue = option.default.call(this);
  } else if (typeof option.default !== "undefined") {
    defaultValue = option.default;
  }

  let isEqualValue: boolean = false;

  if (typeof option.compare === "function") {
    isEqualValue = option.compare.call(this, rawValue, defaultValue);
  } else {
    isEqualValue = rawValue === defaultValue;
  }

  return isEqualValue;
}

export function getValues(this: Vue | void, options: NormalizerOptions, query: RouteValues): NormalizerValues {
  return Object.entries(options)
    .reduce((params, [key, option]) => {
      const rawValue = query[key];
      let value;

      if (typeof rawValue === "undefined") {
        if (typeof option.default === "function") {
          value = option.default.call(this);
        } else if (typeof option.default !== "undefined") {
          value = option.default;
        }
      } else if (typeof option.in === "function") {
        value = option.in.call(this, rawValue);
      } else if (typeof option.type !== "undefined") {
        value = option.type(rawValue);
      } else {
        value = rawValue;
      }

      checkValueType(key, option, value);

      params[key] = value;

      return params;
    }, {} as NormalizerValues);
}

export function getQuery(this: Vue | void, options: NormalizerOptions, params: NormalizerValues, oldQuery: RouteValues = {}): LocationValues {
  return Object.entries(options)
    .reduce((query, [key, option]) => {
      const rawValue = params[key];
      const isEqualValue = compareWithDefault.call(this, option, rawValue);

      if (isEqualValue) {
        delete query[key];
        return query;
      }

      let value;

      if (typeof option.out === "function") {
        value = option.out.call(this, rawValue);
      } else {
        value = rawValue;
      }

      if (value === null || value === false || value === undefined) {
        delete query[key];
      } else {
        query[key] = String(value); // to String for url string consistency
      }

      return query;
    },
    { ...oldQuery });
}
