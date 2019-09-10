import Vue, { ComponentOptions } from "vue";

import {LocationValues, NormalizerSettings, NormalizerValues, RouteValues} from "../types/normalizer";
import { proceed } from "./proceed";
import { getQuery } from "./utils";

const defaultSettings: NormalizerSettings = {
  hideDefaults: true,
};

const createQueryNormalizerMixin = (settings: NormalizerSettings = defaultSettings): ComponentOptions<Vue> => ({
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

      return getQuery.call(this, options, params, this.$route.query, settings);
    },
  },
});

const queryNormalizerMixin: ComponentOptions<Vue> = createQueryNormalizerMixin();

export {
  createQueryNormalizerMixin,
  queryNormalizerMixin,
};
