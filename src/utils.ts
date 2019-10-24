/* tslint:disable:no-console max-line-length */
import Vue from "vue";

import {
  LocationValues,
  NormalizerOption,
  NormalizerOptions,
  NormalizerSettings,
  NormalizerValue,
  NormalizerValues,
  RouteValue,
  RouteValues,
} from "../types/normalizer";

export function isEqualQuery(options: NormalizerOptions, patch: LocationValues, query: RouteValues): boolean {
  return Object.keys(options).every((key) => String(patch[key]) === String(query[key]));
}

export function checkValueType(key: string, option: NormalizerOption<NormalizerValue>, value: NormalizerValue) {
  const hasTypeAndValue = typeof option.type !== "undefined" && typeof value !== "undefined";

  if (!hasTypeAndValue) {
    return;
  }

  // @ts-ignore
  const isInstanceOfType = Object(value) instanceof option.type;

  if (!isInstanceOfType) {
    console.warn("Query type error!", key, value);
  }
}

export function isEqualDefault(this: Vue | void, option: NormalizerOption<NormalizerValue>, normalizerValue: NormalizerValue): boolean {
  const defaultValue: NormalizerValue = getDefaultValue.call(this, option);

  if (typeof option.compare === "function") {
    return option.compare.call(this, normalizerValue, defaultValue);
  }

  return normalizerValue === defaultValue;
}

function getDefaultValue(this: Vue | void, option: NormalizerOption<any>) {
  if (typeof option.default === "function") {
    return option.default.call(this);
  }

  return option.default;
}

function getValue(this: Vue | void, option: NormalizerOption<any>, routeValue: RouteValue) {
  if (typeof routeValue === "undefined") {
    return getDefaultValue.call(this, option);
  }

  if (typeof option.in === "function") {
    return option.in.call(this, routeValue);
  }

  if (typeof option.type !== "undefined") {
    return option.type(routeValue);
  }

  return routeValue;
}

export function getValues(this: Vue | void, options: NormalizerOptions, routeValues: RouteValues): NormalizerValues {
  return Object.entries(options)
    .reduce((params, [key, option]) => {
      params[key] = getValue.call(this, option, routeValues[key]);

      checkValueType(key, option, params[key]);

      return params;
    }, {} as NormalizerValues);
}

function convertToRouteValue(this: Vue | void, option: NormalizerOption<any>, normalizerValue: NormalizerValue): string {
  let value;

  if (typeof option.out === "function") {
    value = option.out.call(this, normalizerValue);
  } else {
    value = normalizerValue;
  }

  if (value === null || value === false || value === undefined) {
    return "";
  }

  return String(value); // to String for url string consistency
}

export function queryGet(this: Vue | void, options: NormalizerOptions, normalizerValues: NormalizerValues, routeValues: RouteValues = {}, settings: NormalizerSettings): LocationValues {
  return Object.entries(options)
    .reduce((query, [key, option]) => {
      const normalizerValue = normalizerValues[key];
      const needToHide = settings.queryHideDefaults && isEqualDefault.call(this, option, normalizerValue);

      if (needToHide) {
        delete query[key];
        return query;
      }

      const routeValue = convertToRouteValue.call(this, option, normalizerValue);

      if (routeValue) {
        query[key] = routeValue;
      } else {
        delete query[key];
      }

      return query;
    },
    { ...routeValues });
}
