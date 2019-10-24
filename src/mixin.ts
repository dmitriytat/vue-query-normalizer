import Vue, { ComponentOptions } from "vue";

import { LocationValues, NormalizerSettings, NormalizerValues } from "../types/normalizer";
import { proceed } from "./proceed";
import { queryGet } from "./utils";

const defaultSettings: NormalizerSettings = {
  queryHideDefaults: true,
};

const createQueryNormalizerMixin = (settings: NormalizerSettings = defaultSettings): ComponentOptions<Vue> => ({
  queryHideDefaults: settings.queryHideDefaults,

  beforeCreate(this: Vue) {
    if (!this.$options.query) {
      return;
    }

    // @ts-ignore
    Vue.util.defineReactive(this, "_query", {});
    Object.defineProperty(this, "$query", {
      get() {
        return this._query;
      },
    });
  },

  mounted(this: Vue) {
    if (!this.$options.query) {
      return;
    }

    proceed.call(this, this.$options.query, this.$route.query, true);
  },

  watch: {
    "$route.query"(this: Vue): void {
      if (!this.$options.query) {
        return;
      }

      proceed.call(this, this.$options.query, this.$route.query);
    },
  },

  methods: {
    $queryGet(this: Vue, patch: NormalizerValues = {}): LocationValues {
      if (!this.$options.query) {
        return this.$route.query;
      }

      const params: NormalizerValues = {
        ...this.$query,
        ...patch,
      };

      const queryHideDefaults = Boolean(this.$options.queryHideDefaults);
      return queryGet.call(this, this.$options.query, params, this.$route.query, { queryHideDefaults });
    },
  },
});

const queryNormalizerMixin: ComponentOptions<Vue> = createQueryNormalizerMixin();

export {
  createQueryNormalizerMixin,
  queryNormalizerMixin,
};
