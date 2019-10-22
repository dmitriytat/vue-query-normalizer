/* tslint:disable:interface-name */

import { Dictionary } from "vue-router/types/router";

type LocationValue = string | Array<string | null> | null | undefined;
type LocationValues = Dictionary<LocationValue>;
type RouteValue = string | Array<string | null>;
type RouteValues = Dictionary<RouteValue>;
type NormalizerValue = any;
type NormalizerValues = Dictionary<NormalizerValue>;

type DefaultValueFunction<T> = () => T;

export interface NormalizerOption<T> {
  type?: (value: RouteValue) => T;
  default?: DefaultValueFunction<T> | T;
  in?: (value: RouteValue) => T;
  out?: (value: T) => LocationValue;
  compare?: (rawValue: T, defaultValue: T) => boolean;
}

export interface NormalizerSettings {
  queryHideDefaults: boolean;
}

type NormalizerOptions = Dictionary<NormalizerOption<NormalizerValue>>;
