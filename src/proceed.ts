import Vue from "vue/";
import { NormalizerOptions, RouteValues } from "../types";
import { getValues, isEqualQuery } from "./utils";

// tslint:disable-next-line:max-line-length
export function proceed(this: Vue, options: NormalizerOptions = {}, routeValues: RouteValues = {}, check: boolean = false): void {
  const normalizerValues = getValues.call(this, options, routeValues);

  if (check) {
    const newQuery = this.$queryGet(normalizerValues);
    const isEquivalent = isEqualQuery(options, newQuery, this.$route.query);

    if (!isEquivalent) {
      this.$router.replace({ query: newQuery });

      return;
    }
  }

  this._query = normalizerValues;

  const { queryReady } = this.$options;

  if (typeof queryReady === "function") {
    queryReady.call(this);
  }
}
