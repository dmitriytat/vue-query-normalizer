/* eslint-disable no-underscore-dangle */
import Vue from 'vue';

import { isEqual } from './utils';

/**
 * Do logic
 * @param {{string: *}} options - query options
 * @param {{string: *}} query - $route.query
 * @param {boolean} check - initial check
 */
export function proceedQuery(options = {}, query = {}, check = false) {
  const _query = Object.entries(options).reduce((q, [key, params]) => {
    const rawValue = query[key];
    let value;

    if (typeof rawValue === 'undefined') {
      if (typeof params.default === 'function') {
        value = params.default.call(this);
      } else {
        value = params.default;
      }
    } else if (typeof params.in === 'function') {
      value = params.in.call(this, rawValue);
    } else if (typeof params.type !== 'undefined') {
      value = params.type(rawValue);
    }

    if (typeof params.type !== 'undefined') {
      if (!(Object(value) instanceof params.type)) {
        // eslint-disable-next-line no-console
        console.warn('Query type error: ', key, value);
      }
    }

    q[key] = value;

    return q;
  }, {});

  this._query = _query;

  if (check) {
    const newQuery = this.$queryGet(_query);
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
      proceedQuery.call(this, options, this.$route.query, true);
    }
  },

  watch: {
    // eslint-disable-next-line func-names
    '$route.query': function (query) {
      const options = this.$options.query;

      if (options) {
        proceedQuery.call(this, options, query);
      }
    },
  },

  methods: {
    $queryGet(patch = {}) {
      const options = this.$options.query;

      if (!options) {
        return {};
      }

      const values = {
        ...this.$query,
        ...patch,
      };

      return Object.entries(options)
        .reduce((query, [key, params]) => {
          if (values[key] === params.default) {
            // eslint-disable-next-line no-param-reassign
            delete query[key];
            return query;
          }

          let value;

          if (typeof params.out === 'function') {
            value = params.out.call(this, values[key]);
          } else {
            value = values[key];
          }

          if (value !== null && value !== false && value !== undefined) {
            // eslint-disable-next-line no-param-reassign
            query[key] = String(value);
          } else {
            // eslint-disable-next-line no-param-reassign
            delete query[key];
          }

          return query;
        },
        { ...this.$route.query });
    },
  },
};

export { queryNormalizerMixin };
