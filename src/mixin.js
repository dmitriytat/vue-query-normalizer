/* eslint-disable no-underscore-dangle,no-param-reassign */
import Vue from 'vue';

import { getQueryParams, getQueryValues, isEqual } from './utils';

/**
 * Do logic
 * @param {{string: *}} options - query options
 * @param {{string: *}} query - $route.query
 * @param {boolean} check - initial check
 */
export function proceed(options = {}, query = {}, check = false) {
  this._query = getQueryValues.call(this, options, query);

  if (check) {
    const newQuery = this.$queryGet(this._query);
    const isEquivalent = isEqual(options, newQuery, this.$route.query);

    if (!isEquivalent) {
      this.$router.replace({ query: newQuery });

      return;
    }
  }

  const { queryReady } = this.$options;

  if (typeof queryReady === 'function') {
    queryReady.call(this);
  }
}

const queryNormalizerMixin = {
  beforeCreate() {
    const options = this.$options.query;

    if (options) {
      Vue.util.defineReactive(this, '_query', {});

      Object.defineProperty(this, '$query', {
        get() {
          return this._query;
        },
      });
    }
  },

  mounted() {
    const options = this.$options.query;

    if (options) {
      proceed.call(this, options, this.$route.query, true);
    }
  },

  watch: {
    // eslint-disable-next-line func-names
    '$route.query': function (query) {
      const options = this.$options.query;

      if (options) {
        proceed.call(this, options, query);
      }
    },
  },

  methods: {
    $queryGet(patch = {}) {
      const options = this.$options.query;

      if (!options) {
        return this.$route.query;
      }

      const params = {
        ...this.$query,
        ...patch,
      };

      return getQueryParams.call(this, options, params, this.$route.query);
    },
  },
};

export { queryNormalizerMixin };
