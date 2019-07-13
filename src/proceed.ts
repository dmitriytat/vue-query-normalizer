import Vue from "vue/";
import { NormalizerOptions, RouteValues } from "../types";
import { getValues, isEqualQuery } from "./utils";

// tslint:disable-next-line:max-line-length
export function proceed(this: Vue, options: NormalizerOptions = {}, query: RouteValues = {}, check: boolean = false): void {
  this._query = getValues.call(this, options, query);

  if (check) {
    const newQuery = this.$queryGet(this._query);
    const isEquivalent = isEqualQuery(options, newQuery, this.$route.query);

    if (!isEquivalent) {
      this.$router.replace({ query: newQuery });

      return;
    }
  }

  const { queryReady } = this.$options;

  if (typeof queryReady === "function") {
    queryReady.call(this);
  }
}
