/* tslint:disable:max-line-length */
import Vue, { ComponentOptions } from "vue";

import { LocationValues, NormalizerOptions, NormalizerValues, RouteValues } from "../types/normalizer";

import { getQuery, getValues, isEqualQuery } from "./utils";

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

const queryNormalizerMixin: ComponentOptions<Vue> = {
  beforeCreate(this: Vue) {
    const options = this.$options.query;

    if (options) {
      // @ts-ignore
      Vue.util.defineReactive(this, "_query", {});

      Object.defineProperty(this, "$query", {
        get() {
          return this._query;
        },
      });
    }
  },

  mounted(this: Vue) {
    const options = this.$options.query;

    if (options) {
      proceed.call(this, options, this.$route.query, true);
    }
  },

  watch: {
    "$route.query"(this: Vue, query: RouteValues): void {
      const options = this.$options.query;

      if (options) {
        proceed.call(this, options, query);
      }
    },
  },

  methods: {
    $queryGet(this: Vue, patch: NormalizerValues = {}): LocationValues {
      const options = this.$options.query;

      if (!options) {
        return this.$route.query;
      }

      const params: NormalizerValues = {
        ...this.$query,
        ...patch,
      };

      return getQuery.call(this, options, params, this.$route.query);
    },
  },
};

export { queryNormalizerMixin };
